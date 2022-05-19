import { Flex, IconButton, Text } from "@chakra-ui/react"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { MouseEventHandler } from "react"

const KeyPrev = ({name, onRemove} : {name: String, onRemove: MouseEventHandler<HTMLElement>}) => {
    return (
        <>
            <Flex bg="#B3D6FF" borderRadius="20px" align="center" p="20px 15px" mt="15px" boxShadow="0px 2px 5px 1px rgba(0,24,0,0.5), inset 0px 6px 10px 1px rgba(255,255,255,0.3)">
                <Flex direction="column" grow="2">
                    <Text color="black" fontSize="sm"><b>Key Type: </b>{name}</Text>
                </Flex>
                <Flex direction="column">
                </Flex>
            </Flex>
        </>
    )
}

export default KeyPrev