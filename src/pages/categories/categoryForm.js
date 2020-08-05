import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  useToast,
} from "@chakra-ui/core";
import { FirebaseContext } from "../../firebase";
import { COLLECTION_NAMES } from "../../utilities/constants";
import { useHistory, Link, useParams } from "react-router-dom";

const CategoryForm = () => {
  const { firebase } = useContext(FirebaseContext);
  const { CATEGORIES } = COLLECTION_NAMES;
  const toast = useToast();
  const history = useHistory();
  const { cat_id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: cat_id || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("A category name is required."),
    }),
    onSubmit: (values) => {
      firebase.db
        .collection(CATEGORIES)
        .doc(values.name)
        .set({})
        .then(() => {
          toast({
            title: "Category Saved.",
            description:
              "You have successfully saved the category named " + values.name,
            status: "Success",
            duration: 5000,
            isClosable: true,
          });
          history.push("/categories");
        });
    },
  });
  return (
    <Flex justifyContent="center" alignItems="center">
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel htmlFor="name" fontWeight="bold" color="primary.800">
            Category Name
          </FormLabel>
          <Input
            name="name"
            placeholder="Category Name"
            {...formik.getFieldProps("name")}
          />
          <FormErrorMessage>
            {formik.touched.name && formik.errors.name && formik.errors.name}
          </FormErrorMessage>
        </FormControl>
        <Flex alignItems="center" justifyContent="space-around" mt={4}>
          <Button
            variantColor="teal"
            isLoading={formik.isSubmitting}
            type="submit"
          >
            Save
          </Button>
          <Button
            variant="outline"
            as={Link}
            to="/categories"
            variantColor="teal"
          >
            Cancel
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default CategoryForm;
