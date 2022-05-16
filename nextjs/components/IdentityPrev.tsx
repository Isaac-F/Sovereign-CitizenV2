import { Flex, IconButton, Text } from "@chakra-ui/react"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"

const IdentityPrev = ({name} : {name: String}) => {
    return (
        <>
            <Flex bg="#B3D6FF" borderRadius="20px" align="center" p="20px 15px" mt="15px">
                <Flex direction="column" grow="2">
                    <Text color="black" fontSize="2xl">{name}</Text>
                    <Text color="black" fontSize="sm"><b>ID:</b> </Text>
                    <Text color="black" fontSize="sm"><b>Created:</b> </Text>
                </Flex>
                <Flex direction="column">
                    <IconButton aria-label="Edit" icon={<EditIcon/>} color="black"/>
                    <IconButton aria-label="Remove" icon={<DeleteIcon/>} color="black"/>
                </Flex>
            </Flex>
        </>
    )
}

export default IdentityPrev