import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { Box, Heading, Button, IconButton, Flex } from "@chakra-ui/core";
import { COLLECTION_NAMES } from "../../utilities/constants";
import { FaPlus, FaEdit } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    firebase.db
      .collection(COLLECTION_NAMES.CATEGORIES)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
      })
      .then((catDocs) => {
        setCategories(catDocs);
      });
  }, []);

  return (
    <Box>
      <Heading>Categories</Heading>
      <Button as={Link} to="/category/add" variantColor="primary">
        <FaPlus />
      </Button>
      <Box p={4} width="50%" mx="auto">
        {categories.map((category) => (
          <Flex key={category.id} mb={1}>
            <Box flex={1}>{category.id}</Box>
            <Box>
              <IconButton
                as={Link}
                to={`/category/add/${category.id}`}
                variant="outline"
                variantColor="teal"
                aria-label="Edit Category"
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

export default Categories;
