import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { Box, Heading, Button, IconButton, Flex } from "@chakra-ui/core";
import { COLLECTION_NAMES } from "../../utilities/constants";
import { FaPlus, FaEdit } from "react-icons/fa";

const Retailers = () => {
  const [retailers, setRetailers] = useState([]);

  useEffect(() => {
    firebase.db
      .collection(COLLECTION_NAMES.RETAILERS)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
      })
      .then((retDocs) => {
        setRetailers(retDocs);
      });
  }, []);

  return (
    <Box>
      <Heading>Retailers</Heading>
      <Button as={Link} to="/retailers/add" variantColor="primary">
        <FaPlus />
      </Button>
      <Box p={4} width="50%" mx="auto">
        {retailers.map((retailers) => (
          <Flex key={retailers.id} mb={1}>
            <Box flex={1}>{retailers.id}</Box>
            <Box>
              <IconButton
                as={Link}
                to={`/retailers/add/${retailers.id}`}
                variant="outline"
                variantColor="teal"
                aria-label="Edit Retailer"
                fontSize="sm"
                size="sm"
                icon={FaEdit}
              />
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default Retailers;
