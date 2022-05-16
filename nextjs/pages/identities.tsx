import type {NextPage} from "next"
import Head from "next/head"

import PageContainer from '../components/PageContainer'
import SovCitHeader from '../components/SovCitHeader'
import IdentityPrev from "../components/IdentityPrev"

// import { CONNECTION_STATUS, useDappStatus } from '../core/ethereum'

import { Center, Flex, Image, Text, Button } from "@chakra-ui/react"

const Idens: NextPage = () => {

    // Obviously, these are going to need to get fetched off ETH somehow
    // XXX: replace with DID method
    let citizens = ["John Smith", "Jane Applebee", "Count Dracula", "Frankenstein"];

    return (
        <>
            <Head>
                <title>Sovereign Citizen</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
            </Head>
            <PageContainer>
                <Center>
                    <Flex direction="column" align="center" bg="linear-gradient(180deg, #6FB1FC 0%, #4364F7 50.52%, #0052D4 100%)" borderRadius="20px" h="calc(95vh)" maxW="calc(90vw)" w="calc(28vw)" overflowY="scroll">
                        <SovCitHeader/>
                        <Flex w="85%" direction="column" mt="5%">
                            <Text fontSize="4xl">Welcome back</Text>
                            <Text fontSize="14pt">You have <b>{citizens.length} Citizens</b></Text>
                            {
                                citizens.map((name, index) => {
                                    return <IdentityPrev name={name} id={index}/>
                                })
                            }
                            <Button w="50%" colorScheme="teal" mt="15px" mb="15px">New Identity</Button>
                        </Flex>
                    </Flex>
                </Center>
            </PageContainer>
        </>
    )
}

export default Idens