import { ArrowBackIcon } from "@chakra-ui/icons"
import { Flex, IconButton, Image, Text } from "@chakra-ui/react"

const IdentityPrev = ({back} : {back?: Boolean}) => {

    return (
        <>
            <Flex align="center" justify="space-between" w="85%" mt="5%">
                {(back) ? (<IconButton aria-label="Go back" icon={<ArrowBackIcon/>} variant="link" fontSize="30px" mt="15px"/>) : (<Image src="./SovCit.png" boxSize="55px"></Image>)}
                <Text fontFamily="Inter" fontSize="14pt">Sovereign Citizen</Text>
            </Flex>
        </>
    )
}

export default IdentityPrev