import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  ActivityIndicator 
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { COLORS } from '../constants/theme';

// 1. Validation Schema
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

const AddProductScreen = ({ navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 2. Submission Logic
  const handleProductSubmit = (values, { resetForm }) => {
    setIsSubmitting(true);

    // Simulate network delay for Firestore prep
    setTimeout(() => {
      const productObject = {
        ...values,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      };

      console.log('--- Submission Successful ---');
      console.log('Data:', productObject);
      
      setIsSubmitting(false);
      setShowSuccessModal(true); // Trigger Screenshot 3 Flow
      resetForm();
    }, 1500);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header with Back and Search placeholders from your screenshot */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.headerAction}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Product</Text>
          <TouchableOpacity>
            <Text style={styles.headerAction}>Search</Text>
          </TouchableOpacity>
        </View>

        <Formik
          initialValues={{ title: '', description: '', price: '' }}
          validationSchema={ProductSchema}
          onSubmit={handleProductSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <View style={styles.form}>
              
              <Text style={styles.label}>Product Title</Text>
              <TextInput
                style={[styles.input, touched.title && errors.title && styles.inputError]}
                placeholder="Enter product title"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

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

              <Text style={styles.label}>Product Image</Text>
              <View style={styles.imagePlaceholder}>
                <TouchableOpacity style={styles.uploadBtn} disabled={true}>
                  <Text style={styles.uploadBtnText}>Upload Image</Text>
                </TouchableOpacity>
                <Text style={styles.subNote}>(Image upload will be enabled in future updates)</Text>
              </View>

              <TouchableOpacity 
                style={[styles.submitBtn, (!isValid || isSubmitting) && styles.submitBtnDisabled]} 
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Submit Product</Text>}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>

      {/* SUCCESS MODAL FLOW */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Success</Text>
            <Text style={styles.modalSubText}>Your product has been added successfully!</Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => {
                setShowSuccessModal(false);
                navigation.navigate('Home'); 
              }}>
                <Text style={styles.actionText}>VIEW PRODUCTS</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowSuccessModal(false)}>
                <Text style={styles.actionText}>ADD ANOTHER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 50, 
    paddingBottom: 15,
    alignItems: 'center' 
  },
  headerAction: { fontSize: 16, color: '#333' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  form: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fafafa', marginBottom: 5,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 15 },
  imagePlaceholder: {
    height: 180, borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 30,
  },
  uploadBtn: { backgroundColor: '#e0e0e0', padding: 10, borderRadius: 5 },
  uploadBtnText: { color: '#666' },
  subNote: { fontSize: 12, color: '#999', marginTop: 10 },
  submitBtn: { backgroundColor: '#439A73', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 40 },
  submitBtnDisabled: { backgroundColor: '#A5D6A7' },
  submitBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: 'white', padding: 25, borderRadius: 4, elevation: 10 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  modalSubText: { fontSize: 16, color: '#555', marginBottom: 25 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end' },
  actionText: { color: '#439A73', fontWeight: 'bold', marginLeft: 20 },
});

export default AddProductScreen;