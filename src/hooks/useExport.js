import { saveAs } from 'file-saver';
import axios from '../utils/axios';
import { serverUrl } from '../config';

export const useExport = () => {
  const ExportAllSelectionPDF = async (projectId) => {
    const data = {
      intProjectID: projectId,
      intUAL: localStorage.getItem('UAL'),
      intUserID: localStorage.getItem('userId'),
    };

    await axios.post(`${serverUrl}/api/units/DownloadAllSelection`, data, { responseType: 'blob' }).then((response) => {
      if (!response?.data?.size || response?.data?.size === 0) {
        return;
      }
      // Get File Name
      let filename = '';
      const disposition = response.headers['content-disposition'];
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      // Save File
      saveAs(response.data, `${filename}.pdf`);
    });
  }

  const ExportSelectionPDF = async (projectId, unitInfo) => {
    const data = {
      intProjectID: projectId,
      intUnitNo: unitInfo,
      intUAL: localStorage.getItem('UAL'),
      intUserID: localStorage.getItem('userId'),
    };

    await axios.post(`${serverUrl}/api/units/DownloadSelection`, data, { responseType: 'blob' }).then((response) => {
      console.log(response);
      // Get File Name
      let filename = '';
      const disposition = response.headers['content-disposition'];
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      // Save File
      saveAs(response.data, `${filename}.pdf`);
    });
  };

  const ExportSelectionExcel = async (projectId, unitInfo) => {
    const data = {
      intProjectID: projectId,
      intUnitNo: unitInfo,
      intUAL: localStorage.getItem('UAL'),
      intUserID: localStorage.getItem('userId'),
    };

    await axios
      .post(`${serverUrl}/api/units/downloadselectionwithexcel`, data, { responseType: 'blob' })
      .then((response) => {
        // Extract the filename from the response headers
        const disposition = response.headers['content-disposition'];
        const regex = /filename="(.+)"/;
        const matches = regex.exec(disposition);
        const fileName = matches && matches[1] ? matches[1] : 'selection.xlsx';

        // Create a temporary URL for the downloaded file
        const url = URL.createObjectURL(new Blob([response.data]));
        // Create a link element and simulate a click to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

        // Cleanup: remove the temporary URL and link element
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  const ExportSubmittal = async (intProjectID) => {
    const data = {
      intJobID: intProjectID,
      intUAL: localStorage.getItem('UAL'),
      intUserID: localStorage.getItem('userId'),
    };

    const response = await axios.post(`${serverUrl}/api/submittals/exportpdf`, data, { responseType: 'blob' });
    console.log(response.data.type);
    if (response.data.type === 'application/json') {
      return false;
    }

    // Get File Name
    let filename = '';
    const disposition = response.headers['content-disposition'];
    if (disposition && disposition.indexOf('attachment') !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
    }

    // Save File
    saveAs(response.data, `${filename}`);
    return true;
  };
  // export pdf of form data
  const ExportSubmittalEpicor = async (intProjectId) => {
    const data = {
      intJobID: intProjectId,
      intUAL: localStorage.getItem('UAL'),
      intUserID: localStorage.getItem('userId'),
    };

    const response = await axios.post(`${serverUrl}/api/submittals/exportepicor`, data, { responseType: 'blob' });
    if (response.data.type === 'application/json') {
      return false;
    }

    // Get File Name
    let filename = '';
    const disposition = response.headers['content-disposition'];
    if (disposition && disposition.indexOf('attachment') !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
    }

    // Save File
    saveAs(response.data, `${filename}`);
    return true;
  };

  const ExportSchedule = (projectInfo) => {};
  const ExportRevit = (projectInfo) => {};
  const ExportQuote = async (intProjectID) => {
    const data = {
      intJobID: intProjectID,
      intUAL: localStorage.getItem('UAL'),
      intUserID: localStorage.getItem('userId'),
    };

    const response = await axios.post(`${serverUrl}/api/quote/exportPdf`, data, { responseType: 'blob' });

    if (response.data.type === 'application/json') {
      if (!response.data.success) return 'fail';
      return 'server_error';
    }

    // Get File Name
    let filename = '';
    const disposition = response.headers['content-disposition'];
    if (disposition && disposition.indexOf('attachment') !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
    }

    // Save File
    saveAs(response.data, `${filename}.pdf`);
    return true;
  };

  return {
    ExportAllSelectionPDF,
    ExportSelectionPDF,
    ExportSelectionExcel,
    ExportSubmittal,
    ExportSubmittalEpicor,
    ExportSchedule,
    ExportRevit,
    ExportQuote,
  };
};
