import type { NextPage } from 'next'
import Head from 'next/head'
import PageContainer from '../components/PageContainer'

import { CONNECTION_STATUS, useDappStatus } from '../core/ethereum'

import { Flex, Button, Center, Image, Text } from "@chakra-ui/react"

const Home: NextPage = () => {

  const { connectionStatus, connectedAccount } = useDappStatus()

  return (
    <>
      <Head>
        <title>Sovereign Citizen</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <PageContainer>
        <Center>
          <Flex direction="column" justify="space-evenly" align="center" bg="linear-gradient(180deg, #6FB1FC 0%, #4364F7 50.52%, #0052D4 100%)" borderRadius="20px" h="calc(95vh)" maxW="calc(90vw)" w="calc(28vw)">
            <Flex direction="column" align="center">
              <Image src="./SovCit.png" boxSize="200px"></Image>
              <Text fontFamily="'Inter', sans-serif" fontSize="30pt" textAlign="center">sovereign citizen</Text>
            </Flex>
            <Button width="40%" size="lg" borderRadius="5px" bg="orange.400" fontWeight="500" _hover={{bg:"orange.600"}}>
              {connectionStatus === CONNECTION_STATUS.CONNECTED && connectedAccount ? `Launch` : `Connect Wallet`}
            </Button>
          </Flex>
        </Center>
      </PageContainer>
    </>
  )
}

export default Home
