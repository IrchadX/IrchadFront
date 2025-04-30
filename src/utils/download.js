export const downloadReport = async (filename) => {
    try {
      const response = await fetch(`http://localhost:5000/reports/${filename}`);
      
      if (!response.ok) {
        throw new Error("Erreur lors du téléchargement");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
  