import React, { useState } from "react";
import { SimpleGrid, Grid, Flex, Text, Box } from "@chakra-ui/core";
import Chat from "./Chat";
import Profile from "./Profile";

import Info from "./Info";

const Home = ({ message }) => {
  const [flexHead, setFlexHead] = useState({ flex1: 7, flex2: 0, flexSub: 6 });

  const handleFlex = () => {
    setFlexHead({ flex1: 4.5, flex2: 2.5, flexSub: 4 });
  };
  const handleFlexInitial = () => {
    setFlexHead({ flex1: 7, flex2: 0, flexSub: 6 });
  };
  return (
    <Flex
      width="80%"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      align="center"
    >
      <Flex flex={3} height="93vh" bg="Green">
        <Profile />
      </Flex>
      <Flex
        flex={flexHead.flex1}
        style={{ transition: "width 5s linear" }}
        height="93vh"
        bg="Green"
      >
        <Chat
          messageChat={message}
          handleFlex={handleFlex}
          flexHead={flexHead}
        />
      </Flex>
      <Flex
        h="93vh"
        flex={flexHead.flex2}
        bg="green.500"
        isAnimated
        style={{ transition: "all 0.2s linear" }}
      >
        {flexHead.flex2 ? <Info handleFlex={handleFlexInitial} /> : null}
      </Flex>
    </Flex>
    // <Grid
    //   templateColumns="repeat(1, 1fr)"
    //   h="93vh"
    //   //   mx="auto"
    //   //   mt="auto"
    //   //   mb="20px"
    //   //columns={2}
    //   //px="30px"
    //   w="80%"
    //   spacingX="0px"
    //   gap={0}
    // >
    //   <Box w="40%" bg="blue.500"></Box>
    //   <Box w="60%" bg="white"></Box>
    // </Grid>
  );
};

export default Home;
