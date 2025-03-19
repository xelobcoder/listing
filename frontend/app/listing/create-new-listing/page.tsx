'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import NavigationMenuCustomUi from "@/components/customui/NavigationMenu";
import { PropertyFormFields } from '../../../components/components/PropertyFormFields';
import { propertySchema, type PropertyFormValues } from '../../../components/components/schemas/propertySchema';

export default function PropertyForm() {
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      propertyType: "HOUSE",
      bedrooms: 0,
      bathrooms: 0,
      squareFeet: 0,
      lotSize: 0,
      yearBuilt: 0,
      status: "PENDING",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      latitude: 0,
      longitude: 0,
      hasGarage: false,
      hasPool: false,
      hasBasement: false,
      hasFireplace: false,
      parkingSpaces: 0,
      heatingType: "NONE",
      coolingType: "NONE",
      videoUrl: "",
      floorPlans: [],
      agentId: "a1111111-1111-1111-1111-111111111111",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
      
      form.setValue('imageFiles', [...imageFiles, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviews];
    
    URL.revokeObjectURL(updatedPreviews[index]);
    
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    form.setValue('imageFiles', updatedFiles);
  };

  React.useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  async function onSubmit(values: PropertyFormValues) {
    console.log('Form submission started', values);
    
    try {
      const formValues = {
        ...values,
        agentId: 'a1111111-1111-1111-1111-111111111111'
      };
      
      const formData = new FormData();
      
      Object.entries(formValues).forEach(([key, value]) => {
        if (key !== 'imageFiles') {
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        }
      });
      
      if (imageFiles.length > 0) {
        imageFiles.forEach((file, index) => {
          formData.append(`image_${index}`, file);
        });
      }
      
      console.log('Form data prepared for submission');
      console.log('Number of images:', imageFiles.length);
      
      const response = await fetch('/api/properties', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(errorData.message || 'Failed to create property listing');
      }
      
      const result = await response.json();
      console.log('Property created successfully:', result);
      
      form.reset();
      setImageFiles([]);
      setImagePreviews([]);
      
      alert('Property listing created successfully!');
    } catch (error) {
      console.error('Error creating property:', error);
      alert(`Failed to create property listing: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return (
    <div>
      <NavigationMenuCustomUi />
      <div className="container mx-auto py-10 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Create New Property Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <PropertyFormFields
                form={form}
                imageFiles={imageFiles}
                imagePreviews={imagePreviews}
                handleImageUpload={handleImageUpload}
                removeImage={removeImage}
                onSubmit={onSubmit}
              />
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
