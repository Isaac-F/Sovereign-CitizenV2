import { Box, Button, ButtonSpinner, CircularProgress, Flex, Heading, Input, Spinner, Text, useStyleConfig, Wrap } from '@chakra-ui/react'
import React, { useState } from 'react'
import PageContainer from '../../components/PageContainer';
import { useDappStatus } from '../../core/ethereum';
import { EthrDID } from 'ethr-did'
import { Web3Provider } from '@ethersproject/providers'
import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'
import { ethers } from 'ethers'

const PlaygroundCard = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  const styles = useStyleConfig('Card')

  return (
    <Box w={['100%', '50%', '33%']} padding="0.5em">
      <Box sx={styles} padding="0.5em">
        {children}
      </Box>
    </Box>
  )
}

const Playground = () => {

  const { dappAPI } = useDappStatus()
  
  
  const [greeting, setGreeting] = useState<string | undefined>(undefined)
  const [greetingInput, setGreetingInput] = useState<string | undefined>(undefined)
  const [setGreetingLoading, setSetGreetingLoading] = useState(false)

  const [DID, setDID] = useState<string | undefined>(undefined) 

  const getGreetingClicked = async () => {
    if (!dappAPI) return
    setGreeting(await dappAPI.greeter.greet())
  }

  const setGreetingClicked = async () => {
    if (!greetingInput || !dappAPI) return
    setSetGreetingLoading(true)
    try {
      const tx = await dappAPI.greeter.setGreeting(greetingInput)
      await tx.wait()
    } catch (e) {
      console.error(e)
    }
    setSetGreetingLoading(false)

  }

  const makeResolver = async () => {
    const provider = new Web3Provider((window as any).ethereum);
    const chainNameOrId = (await provider.getNetwork()).chainId
    const didResolver = new Resolver(getResolver({ name: "Localhost 8545", chainId: chainNameOrId, rpcUrl: "http://localhost:8545", registry: "0xd2c9e64f495e8d39f64dbe2b1010e46b81dc39be"  }));
    return didResolver
  }

  const didResolver = makeResolver()

  const makeDID = async () => {
    const keypair = EthrDID.createKeyPair()
    const provider = new Web3Provider((window as any).ethereum);
    const chainNameOrId = (await provider.getNetwork()).chainId
    const accounts = await provider.listAccounts()
    
    const ethrDid = new EthrDID({identifier: accounts[0], provider, chainNameOrId})

    const rpcUrl = "https://localhost:8545";
    //const providerConfig = { name: "Localhost 8545", chainId: chainNameOrId, rpcUrl: "http://localhost:8545", registry: "0x4a487188328194453ef2aAD68CE263EafE5b0724" }

    
    //const ethrDidResolver = getResolver(providerConfig)
    //const didResolver = new Resolver(ethrDidResolver)

    // You can also use ES7 async/await syntax
    //const doc = await didResolver.resolve(ethrDid.did)

    
    
  
    const tx = await dappAPI?.did.setAttribute(ethrDid.address, ethers.utils.formatBytes32String('did/svc/Test'), ethers.utils.toUtf8Bytes('http://endpoint3.com/1234-1234-1234'), 31104000)
    await tx?.wait()
    const didDocument = (await (await didResolver).resolve(ethrDid.did)).didDocument
    

    //const temp = await dappAPI?.did.identityOwner(accounts[0])

    //const ethrDIDString = temp
    var ethrDIDString = "id: " + didDocument?.id
    didDocument?.service?.map(service => {
      ethrDIDString += "Service: " + service.serviceEndpoint
    });
    //const ethrDIDString = "id: " + didDocument?.id + ' service: ' + didDocument?.service[2].serviceEndpoint +  ' verificationMethod: ' + didDocument?.verificationMethod + ' publicKey: ' + didDocument?.publicKey
    //await ethrDid.setAttribute('controller', 'something', 10)
    //await ethrDid.addDelegate(accounts[3])
    //await dappAPI?.did.addDelegate(accounts[0], accounts[3])
    //await ethrDid.addDelegate(accounts[0], {expiresIn: 8640000, delegateType: 'sigAuth'})

    
    setDID(ethrDIDString)
  } 


  return (
    <PageContainer>
      <Heading textAlign="center" mb="1em" size="lg">Testing</Heading>
      {dappAPI ? (
        <Wrap justify="center" spacing={0}>
          <PlaygroundCard>
            <Heading textAlign="center" size="md">Greeter Contract</Heading>
            <Flex justifyContent="center" m={3} flexDirection="column">
              <Text align="center">Greeting: {greeting}</Text>
              <Button mt={3}
                onClick={getGreetingClicked}
              >
                Get Greeting
              </Button>
              <Input mt={6} onChange={(e) => { setGreetingInput(e.target.value) }}>

              </Input>
              <Button mt={3} 
              onClick={setGreetingClicked} 
              isLoading={setGreetingLoading}
              disabled={dappAPI.isViewOnly}
              >
                Set Greeting
              </Button>
              
              <Text align="center">{DID}</Text>
			        <Button mt={3} onClick={makeDID}>
			        Make DID
			        </Button> 
            </Flex>
          </PlaygroundCard>
        </Wrap>
      ) : (
        <Flex justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}

    </PageContainer>
  )
}

export default Playground
