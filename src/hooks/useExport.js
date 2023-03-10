import { saveAs } from 'file-saver';
import axios from '../utils/axios';
import { serverUrl } from '../config';

export const useExport = () => {
  const exportSelection = async (projectInfo) => {
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
  const exportSchedule = (projectInfo) => {};
  const exportRevit = (projectInfo) => {};
  const exportQuote = (projectInfo) => {};

  return {
    exportSelection,
    exportSchedule,
    exportRevit,
    exportQuote,
  };
};
