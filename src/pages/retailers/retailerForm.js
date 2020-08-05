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

const RetailerForm = () => {
  const { firebase } = useContext(FirebaseContext);
  const { RETAILERS } = COLLECTION_NAMES;
  const toast = useToast();
  const history = useHistory();
  const { ret_id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: ret_id || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("A retailer name is required."),
    }),
    onSubmit: (values) => {
      firebase.db
        .collection(RETAILERS)
        .add({ values })
        .then(() => {
          toast({
            title: "Retailer Saved.",
            description:
              "You have successfully saved the retailer named " + values.name,
            status: "Success",
            duration: 5000,
            isClosable: true,
          });
          history.push("/retailers");
        });
    },
  });
  return (
    <Flex justifyContent="center" alignItems="center">
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel htmlFor="name" fontWeight="bold" color="primary.800">
            Retailer Name
          </FormLabel>
          <Input
            name="name"
            placeholder="Retailer Name"
            {...formik.getFieldProps("name")}
          />
          <FormErrorMessage>
            {formik.touched.name && formik.errors.name && formik.errors.name}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel htmlFor="type" fontWeight="bold" color="primary.800">
            Retailer Type
          </FormLabel>
          <Input
            name="type"
            placeholder="Retailer Type"
            {...formik.getFieldProps("type")}
          />
          <FormErrorMessage>
            {formik.touched.name && formik.errors.name && formik.errors.name}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel
            htmlFor="contactName"
            fontWeight="bold"
            color="primary.800"
          >
            Contact Name
          </FormLabel>
          <Input
            name="contactName"
            placeholder="Name of Contact Person"
            {...formik.getFieldProps("contactName")}
          />
          <FormErrorMessage>
            {formik.touched.name && formik.errors.name && formik.errors.name}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel
            htmlFor="contactPhone1"
            fontWeight="bold"
            color="primary.800"
          >
            Contact Phone 1
          </FormLabel>
          <Input
            name="contactPhone1"
            placeholder="Primary Contact Number"
            {...formik.getFieldProps("contactPhone1")}
          />
          <FormErrorMessage>
            {formik.touched.name && formik.errors.name && formik.errors.name}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel
            htmlFor="contactPhone2"
            fontWeight="bold"
            color="primary.800"
          >
            Contact Phone 2
          </FormLabel>
          <Input
            name="contactPhone2"
            placeholder="Secondary Contact Number"
            {...formik.getFieldProps("contactPhone2")}
          />
          <FormErrorMessage>
            {formik.touched.name && formik.errors.name && formik.errors.name}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel htmlFor="website" fontWeight="bold" color="primary.800">
            Website
          </FormLabel>
          <Input
            name="website"
            placeholder="Retailer's website URL"
            {...formik.getFieldProps("website")}
          />
          <FormErrorMessage>
            {formik.touched.name && formik.errors.name && formik.errors.name}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel htmlFor="street1" fontWeight="bold" color="primary.800">
            Address Street 1
          </FormLabel>
          <Input
            name="street1"
            placeholder="Address Street 1"
            {...formik.getFieldProps("street1")}
          />
          <FormErrorMessage>
            {formik.touched.name && formik.errors.name && formik.errors.name}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel htmlFor="street2" fontWeight="bold" color="primary.800">
            Address Street 2
          </FormLabel>
          <Input
            name="street2"
            placeholder="Address Street 2"
            {...formik.getFieldProps("street2")}
          />
          <FormErrorMessage>
            {formik.touched.name && formik.errors.name && formik.errors.name}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel htmlFor="city" fontWeight="bold" color="primary.800">
            City/Town
          </FormLabel>
          <Input
            name="city"
            placeholder="City / Town"
            {...formik.getFieldProps("city")}
          />
          <FormErrorMessage>
            {formik.touched.name && formik.errors.name && formik.errors.name}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel htmlFor="zip" fontWeight="bold" color="primary.800">
            Zip code
          </FormLabel>
          <Input
            name="zip"
            placeholder="Zip code"
            {...formik.getFieldProps("zip")}
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
            to="/retailers"
            variantColor="teal"
          >
            Cancel
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default RetailerForm;
