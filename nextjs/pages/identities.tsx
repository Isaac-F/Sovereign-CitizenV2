import type {NextPage} from "next"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

import PageContainer from '../components/PageContainer'
import SovCitHeader from '../components/SovCitHeader'
import IdentityPrev from "../components/IdentityPrev"

import { CONNECTION_STATUS, useDappStatus } from '../core/ethereum'

import { useState } from "react"
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

const Idens: NextPage = () => {

    const { connectionStatus, connectedAccount } = useDappStatus()
    const end = useDisclosure()
    const key = useDisclosure()

    const [name, setName] = useState('')
    const [url, setUrl] = useState('')

    // Obviously, these are going to need to get fetched off ETH somehow
    // XXX: replace with DID method
    let [endpoints, setEndpoints] = useState(["work", "email", "social media"])
    const router = useRouter()

    // Check if you're connected to MetaMask - if not, get out of here
    useEffect(() => {
        if (connectionStatus !== CONNECTION_STATUS.CONNECTED) {
            router.push("/");
        }
    })

    const newEndpoint = () => {
        // Do something with name and url here
        setEndpoints([...endpoints, name])

        // Reset and close for reuse
        setName('')
        setUrl('')
        end.onClose()
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
                            <Text fontSize="4xl">welcome back</Text>
                            <Text fontSize="14pt">you have <b>{endpoints.length} {endpoints.length == 1 ? "endpoint" : "endpoints"}</b></Text>
                            <Flex justify="space-around">
                                <Button w="45%" colorScheme="teal" mt="15px" mb="15px" fontWeight="500" onClick={end.onOpen}>add endpoint</Button>
                                <Button w="45%" colorScheme="teal" mt="15px" mb="15px" fontWeight="500">modify key</Button>
                            </Flex>
                            {
                                endpoints.map((name) => {
                                    return <IdentityPrev name={name} url={"domain.com/someURL"}/>
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
                </Center>
            </PageContainer>
        </>
    )
}

export default Idens