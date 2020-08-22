import React, { useState, useEffect, useRef } from "react";
import bgChat from "../assets/bg-chat.jpg";
import { Scrollbars } from "react-custom-scrollbars";

import {
  Box,
  Image,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Text,
  Heading,
  Input,
} from "@chakra-ui/core";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UserMessage from "./UserMessage";
import MyMessage from "./MyMessage";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

const Chat = ({ messageChat, handleFlex, flexHead, activeRoom, users }) => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputList, setInputList] = useState(messageChat);
  const [picker, setPicker] = useState(false);

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const handlePicker = () => {
    setPicker(!picker);
  };
  const onEmojiClick = (e) => {
    let emoji = e.native;

    setInputList(`${inputList}${emoji}`);
    console.log(inputList);
    // let sym = e.unified.split("-");
    // let codesArray = [];
    // sym.forEach((el) => codesArray.push("0x" + el));
    // let emoji = String.fromCodePoint(...codesArray);
    // setInputList(emoji);
    //
  };
  //const alanClick = useRef(null);

  useEffect(() => {
    setInputList(messageChat);
  }, [messageChat]);
  const messageEvent = (e) => {
    setInputList(e.target.value);
  };

  const listOfMessages = () => {
    setMessages((oldMessages) => {
      return [...oldMessages, inputList];
    });
    setInputList("");
  };
  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <Box w="100%" bg="white">
      <Flex
        width="100%"
        height="8.75vh"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        align="center"
        bg="gray.100"
      >
        <Flex flex={1} height="100%">
          <div style={{ margin: "auto", clipPath: "circle(45%)" }}>
            <img
              //my="auto"
              src={activeRoom.urlImage}
              //src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              width="55px"
              height="55px"
              // inLine
            />
          </div>
        </Flex>
        <Flex
          flex={flexHead.flexSub}
          height="100%"
          onClick={() => handleFlex()}
        >
          <Text
            cursor="pointer"
            variantColor="black"
            w="100%"
            border="none"
            height="75%"
            overflow="hidden"

            //overflowX="hidden"
          >
            <div
              style={{
                opacity: "0.8",
                margin: "-5px 0 0 0",
                textAlign: "left",
              }}
            >
              {activeRoom.name}
              <br />
              <p
                style={{
                  margin: "0px 0px",
                  opacity: "0.5",
                  textAlign: "left",
                  lineHeight: "30px",
                }}
              >
                {activeRoom.participants.map((userId, index) => {
                  const comma =
                    activeRoom.participants.length - 1 === index ? " " : ", ";
                  let participant = users.find((user) => user.id === userId);
                  return (
                    <span>
                      {participant.name}
                      {comma}{" "}
                    </span>
                  );
                })}
              </p>
            </div>
            <br />
            <div></div>
          </Text>
        </Flex>
        <Flex flex={2} height="100%">
          <SearchIcon
            style={{
              opacity: "0.5",
              margin: "auto 15px auto auto",
              fontSize: "24px",
              cursor: "pointer",
            }}
          />

          <AttachFileIcon
            style={{
              opacity: "0.5",
              margin: "auto 15px",
              fontSize: "24px",
              cursor: "pointer",
            }}
          />
          <MoreVertIcon
            style={{
              opacity: "0.5",
              margin: "auto 25px auto 15px",
              fontSize: "24px",
              cursor: "pointer",
            }}
          />
        </Flex>
      </Flex>

      <Flex h="77vh" bg="gray.300">
        <Scrollbars style={{ width: "100%", height: "100%" }}>
          {/* <Scrollbars style={{ width: "100%", height: "100%" }}> */}

          <Grid
            pt="15px"
            templateColumns="repeat(1, 1fr)"
            //   mx="auto"
            //   mt="auto"
            //   mb="20px"
            //columns={2}
            //px="30px"
            width="100%"
            h="71vh"
            //pb="6vh"
            //overflowY="scroll"
            gap={0}
          >
            {" "}
            {/* <UserMessage message="hello how are you" />
            <MyMessage message="I am fine bro" /> */}
            {/* <UserMessage message="Chal badiya h" />
            <MyMessage message="I am fine bro" />
            <UserMessage message="hn hn pata h" />
            <MyMessage message="chup" />
            <UserMessage message="tu chup ho jaa bsdk saale smjha wahi aake marnga." /> */}
            {activeRoom.messages.map((message) => {
              let participant = users.find(
                (user) => user.id === message.userId
              );
              if (message.userId === "3") {
                return (
                  <MyMessage time={message.sentAt} message={message.text} />
                );
              } else {
                return (
                  <UserMessage
                    name={participant.name}
                    time={message.sentAt}
                    message={message.text}
                  />
                );
              }
            })}
            {messages.map((message, index) => {
              return <MyMessage message={message} />;
            })}
            <br />
            <div ref={messageEndRef} />
          </Grid>
          {/* </Scrollbars> */}
        </Scrollbars>
      </Flex>

      <Flex position="relative" h="7.25vh" w="100%" bg="gray.100">
        <Flex flex={1}>
          {picker && (
            <>
              <Picker
                showPreview={false}
                style={{
                  zIndex: "0",
                  position: "absolute",
                  bottom: "0",

                  //height: "53vh",
                }}
                onSelect={onEmojiClick}
              />
              <Flex flex={1} bg="black" />
            </>
          )}
          <Box w="100%" zIndex={100000} bg="gray.100">
            <InsertEmoticonIcon
              onClick={handlePicker}
              style={{
                opacity: "0.5",
                margin: "15px auto auto 15px",
                fontSize: "24px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Flex>
        <Flex zIndex="1" flex={15}>
          <Box
            zIndex={100000}
            bg="gray.100"
            h="100%"
            w="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              borderRadius="20px"
              h="70%"
              w="95%"
              m="auto"
              mt="6px"
              onChange={messageEvent}
              value={inputList}
              border="none"
              borderRadius="20px"
              placeholder="Type a message"
              size="sm"
            />
          </Box>
        </Flex>
        <Flex position="relative" flex={1}>
          {inputList === "" ? (
            <>
              <div
                // id="alan-btn"
                // ref={alanClick}
                style={{ height: "40px", width: "40px" }}
                // onClick={() => console.log("clicked div")}
              ></div>
              <MicIcon
                // onClick={() => {
                //   console.log("clicked");
                //   alanClick.current.click();
                // }}
                style={{
                  opacity: "0.5",
                  margin: "auto 15px auto auto",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              />
            </>
          ) : (
            <SendIcon
              onClick={listOfMessages}
              style={{
                opacity: "0.5",
                margin: "auto 15px auto auto",
                fontSize: "24px",
                cursor: "pointer",
              }}
            />
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Chat;
