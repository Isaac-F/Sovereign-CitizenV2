import type {NextPage} from "next"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

import PageContainer from '../components/PageContainer'
import SovCitHeader from '../components/SovCitHeader'
import IdentityPrev from "../components/IdentityPrev"

import { EthrDID } from 'ethr-did'
import { Web3Provider } from '@ethersproject/providers'
import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'
import { ethers } from 'ethers'

import { CONNECTION_STATUS, useDappStatus } from '../core/ethereum'

import React, { useState } from "react"
import {
    Center,
    Flex,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Input,
    ModalCloseButton,
    ModalHeader,
    useDisclosure
} from "@chakra-ui/react"
import { UseVisualState } from "framer-motion/types/motion/utils/use-visual-state"

const EP = (name:String, url:String) => {
    return {
        name, url
    }
}

const Idens: NextPage = () => {

    const { connectionStatus, connectedAccount } = useDappStatus()
    
    const { dappAPI } = useDappStatus()

    const end = useDisclosure()
    const key = useDisclosure()

    const [name, setName] = useState('')
    const [url, setUrl] = useState('')

    // Our did string
    const [DID, setDID] = useState<string | undefined>(undefined) 

    // Our did
    const [ethrDid, setethrDid] = useState<EthrDID | undefined>(undefined)
    //const [resolver, setResolver] = useState<Resolver | undefined>(undefined)

    //  Dictionary of endpoints
    const [endPoints, setendPoints] = useState({})

    // Obviously, these are going to need to get fetched off ETH somehow
    // XXX: replace with DID method
    //let [endpoints, setEndpoints] = useState([EP("email", "email.com/login")])
    const router = useRouter()

    const makeDID = async () => {
        const provider = new Web3Provider((window as any).ethereum);
        const chainNameOrId = (await provider.getNetwork()).chainId
        const accounts = await provider.listAccounts()
        const ethrDid = new EthrDID({identifier: accounts[0], provider, chainNameOrId})
        const didResolver = new Resolver(getResolver({ name: "Localhost 8545", chainId: chainNameOrId, 
                rpcUrl: "http://localhost:8545", registry: "0xd2c9e64f495e8d39f64dbe2b1010e46b81dc39be"  }));
       

        var ethrDIDString = "" + ethrDid.did
        setDID(ethrDIDString)
        setethrDid(ethrDid)

        let didDocument = (await (await didResolver).resolve(ethrDid.did)).didDocument
        
        let services = didDocument?.service
        if (services == undefined) {
            services = []
        }   
        
        services.map(service => {
            setendPoints(prevState => ({
                ...prevState,
                [service.id]: [service.serviceEndpoint, service.type]
            }));
        });
    }

    // Check if you're connected to MetaMask - if not, get out of here
    useEffect(() => {
        if (connectionStatus !== CONNECTION_STATUS.CONNECTED) {
            router.push("/");
        }
    })
    
    React.useEffect(() => {

        makeDID() //first execution
       
        setInterval(()=>makeDID(), 3000);
     },[]);

    const newEndpoint = async () => {
        // Do something with name and url here

        ///XXX: Modify DID
        //setEndpoints([...endpoints, EP(name, url)])


        // Reset and close for reuse
        
        const tx = await dappAPI?.did.setAttribute(ethrDid.address, ethers.utils.formatBytes32String('did/svc/' + name), ethers.utils.toUtf8Bytes(url), 31104000)
        await tx?.wait()
        
        setName('')
        setUrl('')
        end.onClose()
    }

    const removeEndpoint = (name:String) => {
        // Called when endpoint is deleted

        // XXX: Blank relevant DID values

        //setEndpoints(endpoints.filter(point => point.name!==name))
    }

    return (
        <>
            <Head>
                <title>Sovereign Citizen</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
            </Head>
            <PageContainer>
                <Center>
                    <Flex direction="column" align="center" bg="linear-gradient(180deg, #6FB1FC 0%, #4364F7 50.52%, #0052D4 100%)" borderRadius="20px" h="calc(95vh)" maxW="calc(90vw)" w="calc(28vw)" overflowY="auto">
                        <SovCitHeader />
                        <Flex w="85%" direction="column" mt="5%">
                            <Text fontSize="4xl">Welcome back</Text>
                            <Text fontSize="14pt">You have <b>{Object.entries(endPoints).length} {Object.entries(endPoints).length == 1 ? "endpoint" : "endpoints"}</b></Text>
                            <Flex justify="space-around">
                                <Button w="45%" colorScheme="teal" mt="15px" mb="15px" fontWeight="500" onClick={end.onOpen}>Add Endpoint</Button>
                                <Button w="45%" colorScheme="teal" mt="15px" mb="15px" fontWeight="500" onClick={key.onOpen}>Modify Key</Button>
                            </Flex>
                            {
                                Object.entries(endPoints).map(([key, value]) => {
                                    return <IdentityPrev name={value[1]} url={value[0]} onRemove={() => removeEndpoint(value[1])} id={key} />
                                })
                            }
                        </Flex>
                    </Flex>

                    <Modal isOpen={end.isOpen} onClose={end.onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalCloseButton/>
                                <ModalHeader>add endpoint</ModalHeader>
                                <ModalBody>
                                    <Input placeholder="name" mb="15px" id="newEndName" onChange={e => setName(e.currentTarget.value)}></Input>
                                    <Input placeholder="url" id="newEndURL" onChange={e => setUrl(e.currentTarget.value)}></Input>
                                </ModalBody>
                                <ModalFooter>
                                    <Button type="submit" onClick={newEndpoint}>Save</Button>
                                </ModalFooter>
                            </ModalContent>
                    </Modal>

                    <Modal isOpen={key.isOpen} onClose={key.onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalCloseButton />
                            <ModalHeader>change key</ModalHeader>
                            <ModalBody>

                            </ModalBody>
                            <ModalFooter>
                                
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Center>
            </PageContainer>
        </>
    )
}

export default Idens