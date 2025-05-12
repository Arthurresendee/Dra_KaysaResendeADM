import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ImagePreview {
  before: string | null;
  after: string | null;
  testimonial: string | null;
}

export const GaleriaForm = () => {
  const [patientName, setPatientName] = useState('');
  const [images, setImages] = useState<ImagePreview>({
    before: null,
    after: null,
    testimonial: null
  });

  const handleDrop = (acceptedFiles: File[], type: keyof ImagePreview) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => ({
          ...prev,
          [type]: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps: getBeforeProps, getInputProps: getBeforeInput } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (files) => handleDrop(files, 'before')
  });

  const { getRootProps: getAfterProps, getInputProps: getAfterInput } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (files) => handleDrop(files, 'after')
  });

  const { getRootProps: getTestimonialProps, getInputProps: getTestimonialInput } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (files) => handleDrop(files, 'testimonial')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementará a lógica de envio
    console.log({ patientName, images });
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="patientName">Nome da Paciente</Label>
          <Input
            id="patientName"
            value={patientName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPatientName(e.target.value)}
            placeholder="Digite o nome da paciente"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Upload Foto Antes */}
          <div className="space-y-2">
            <Label>Foto Antes</Label>
            <div
              {...getBeforeProps()}
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
            >
              <input {...getBeforeInput()} />
              {images.before ? (
                <img src={images.before} alt="Antes" className="w-full h-40 object-cover rounded" />
              ) : (
                <p className="text-sm text-gray-500">Arraste ou clique para selecionar</p>
              )}
            </div>
          </div>

          {/* Upload Foto Depois */}
          <div className="space-y-2">
            <Label>Foto Depois</Label>
            <div
              {...getAfterProps()}
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
            >
              <input {...getAfterInput()} />
              {images.after ? (
                <img src={images.after} alt="Depois" className="w-full h-40 object-cover rounded" />
              ) : (
                <p className="text-sm text-gray-500">Arraste ou clique para selecionar</p>
              )}
            </div>
          </div>

          {/* Upload Foto Depoimento */}
          <div className="space-y-2">
            <Label>Foto Depoimento</Label>
            <div
              {...getTestimonialProps()}
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
            >
              <input {...getTestimonialInput()} />
              {images.testimonial ? (
                <img src={images.testimonial} alt="Depoimento" className="w-full h-40 object-cover rounded" />
              ) : (
                <p className="text-sm text-gray-500">Arraste ou clique para selecionar</p>
              )}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Salvar Registro
        </Button>
      </form>
    </Card>
  );
}; 