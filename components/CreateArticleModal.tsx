import React, { useState } from 'react';
import { Article } from '../types';
import { XIcon } from './icons';

type NewArticleData = Omit<Article, 'id' | 'author' | 'comments' | 'likes' | 'publishedDate'>;

interface CreateArticleModalProps {
    onClose: () => void;
    onCreate: (data: NewArticleData) => void;
}

const CreateArticleModal: React.FC<CreateArticleModalProps> = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState<NewArticleData>({
        title: '',
        category: '',
        excerpt: '',
        content: '',
        imageUrl: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof NewArticleData, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof NewArticleData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };
    
    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof NewArticleData, string>> = {};
        if (!formData.title.trim()) newErrors.title = 'العنوان مطلوب.';
        if (!formData.category.trim()) newErrors.category = 'الفئة مطلوبة.';
        if (!formData.excerpt.trim()) newErrors.excerpt = 'المقتطف مطلوب.';
        if (!formData.content.trim()) newErrors.content = 'المحتوى مطلوب.';
        if (!formData.imageUrl.trim()) {
            newErrors.imageUrl = 'رابط الصورة مطلوب.';
        } else {
            try {
                new URL(formData.imageUrl);
            } catch (_) {
                newErrors.imageUrl = 'الرجاء إدخال رابط صحيح.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onCreate(formData);
        }
    };

    const FormField = ({ name, label, type = 'text', required = true, error }: { name: keyof NewArticleData, label: string, type?: string, required?: boolean, error?: string }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 text-right">{label}</label>
            <div className="mt-1">
                {type === 'textarea' ? (
                     <textarea id={name} name={name} required={required} value={formData[name]} onChange={handleChange} rows={name === 'content' ? 8 : 3} className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'}`} />
                ) : (
                    <input id={name} name={name} type={type} required={required} value={formData[name]} onChange={handleChange} className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'}`} />
                )}
            </div>
            {error && <p className="mt-2 text-sm text-red-600 text-right">{error}</p>}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-2xl w-full">
                <div className="absolute top-0 left-0 pt-4 ps-4">
                    <button onClick={onClose} type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <span className="sr-only">Close</span>
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <h2 id="modal-title" className="text-2xl font-bold text-center text-gray-900 mb-6">
                    إنشاء مقال جديد
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormField name="title" label="عنوان المقال" error={errors.title} />
                    <FormField name="category" label="الفئة" error={errors.category} />
                    <FormField name="imageUrl" label="رابط الصورة" type="url" error={errors.imageUrl} />
                    <FormField name="excerpt" label="مقتطف (يظهر في البطاقة)" type="textarea" error={errors.excerpt} />
                    <FormField name="content" label="المحتوى الكامل للمقال" type="textarea" error={errors.content} />

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            إلغاء
                        </button>
                        <button type="submit" className="w-full sm:w-auto flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            نشر المقال
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateArticleModal;