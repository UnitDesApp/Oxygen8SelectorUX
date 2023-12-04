
export const ROLE_OPTIONS = ['All', 'Projects', 'By Others'];

export const TABLE_HEAD = [
  { id: 'job_name', label: 'Project Name', align: 'left', width: 200 },
  { id: 'reference_no', label: 'Ref no.', align: 'left', width: 80 },
  { id: 'revision_no', label: 'Rev no.', align: 'left', width: 80 },
  { id: 'status', label: 'status', align: 'left', width: 80 },
  { id: 'Customer_Name', label: 'Rep', align: 'left', width: 120 },
  { id: 'Created_User_Full_Name', label: 'Created By', align: 'left', width: 100 },
  { id: 'Revised_User_Full_Name', label: 'Revisied By', align: 'left', width: 100 },
  { id: 'created_date', label: 'Date created', align: 'left', width: 140 },
  { id: 'revised_date', label: 'Date revised', align: 'left', width: 140 },
  { id: '', label: 'Actions', align: 'center', width: 30 },
  { id: '', width: 10 },
];

export const ProjectInfoTableHeader = [
  'QTY',
  'TAG',
  'ITEM',
  'MODEL',
  'VOLTAGE',
  'CONTROLS PREFERENCE',
  'INSTALLATION',
  'DUCT CONNECTION',
  'HANDING',
  'PART DESC',
  'PART NUMBER',
  'PRICING',
];

export const ResourceNames = {
  nova: 'NOVA',
  terra: 'TERRA',
  ventum: 'VENTUM',
  ventum_lite: 'VENTUM LITE',
};