import { saveAs } from 'file-saver';
import axios from '../utils/axios';
import { serverUrl } from '../config';

export const useExport = () => {
  const ExportSelection = async (projectInfo) => {
    const data = {
      intProjectID: projectInfo.projectId,
      intUnitNo: projectInfo.unitNo,
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
  const ExportSubmittal = async (intProjectID) => {
    const data = {
      intJobID: intProjectID,
      intUAL: localStorage.getItem('UAL'),
      intUserID: localStorage.getItem('userId'),
    };

    const response = await axios.post(`${serverUrl}/api/submittals/exportpdf`, data, { responseType: 'blob' });
    console.log(response.data.type);
    if (response.data.type === 'application/json') {
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
    saveAs(response.data, `${filename}`);
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

    console.log(filename);

    // Save File
    saveAs(response.data, `${filename}`);

    console.log('Successed');
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
    console.log(response);

    if (response.data.type === 'application/json') {
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
  };

  return {
    ExportSelection,
    ExportSubmittal,
    ExportSubmittalEpicor,
    ExportSchedule,
    ExportRevit,
    ExportQuote,
  };
};
