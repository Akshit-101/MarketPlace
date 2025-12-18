import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { COLORS, SIZES } from '../constants/theme';


const ProductSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Product title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than zero')
    .required('Price is required'),
});

const AddProductScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add New Product</Text>
      </View>

      <Formik
        initialValues={{ title: '', description: '', price: '' }}
        validationSchema={ProductSchema}
        onSubmit={(values) => {
          Alert.alert("Success", "Form is valid! Ready for Firestore.");
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            {/* Title Field */}
            <Text style={styles.label}>Product Title</Text>
            <TextInput
              style={[styles.input, touched.title && errors.title && styles.inputError]}
              placeholder="Enter product title"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

            {/* Description Field */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea, touched.description && errors.description && styles.inputError]}
              placeholder="Enter product description"
              multiline
              numberOfLines={4}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
            />
            {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

            {/* Price Field */}
            <Text style={styles.label}>Price ($)</Text>
            <TextInput
              style={[styles.input, touched.price && errors.price && styles.inputError]}
              placeholder="Enter price"
              keyboardType="numeric"
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price}
            />
            {touched.price && errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

            {/* Image Placeholder */}
            <Text style={styles.label}>Product Image</Text>
            <View style={styles.imagePlaceholder}>
              <TouchableOpacity style={styles.uploadBtn}>
                <Text style={styles.uploadBtnText}>Upload Image</Text>
              </TouchableOpacity>
              <Text style={styles.subNote}>(Image upload will be enabled in future updates)</Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>Submit Product</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: 20, paddingTop: 60, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  form: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginBottom: 5,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 15 },
  imagePlaceholder: {
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  uploadBtn: { backgroundColor: '#e0e0e0', padding: 10, borderRadius: 5 },
  subNote: { fontSize: 12, color: '#999', marginTop: 10 },
  submitBtn: { backgroundColor: '#439A73', padding: 15, borderRadius: 8, alignItems: 'center' },
  submitBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default AddProductScreen;