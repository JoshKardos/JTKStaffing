const CommonBorder = '1px solid black'
const adminTimesheetTile = {
  marginBottom: '6px',
  marginTop: '6px',
  marginLeft: '16px',
  marginRight: '8px',
  float: 'left',
  border: '2px solid black',
  paddingBottom: '20px',
  width: '270px',
  borderRadius: '8px',
  fontWeight: 'bold',
  textAlign: 'center'
}
export default {
  CommonBorder: {
    border: CommonBorder
  },
  FileUploaderTooltip: {
    marginTop: '-40px',
    marginLeft: '-20px'
  },
  fileUploader: {
    marginTop: '40px',
    display: 'inline'
  },
  dayPickerTooltip: {
    marginTop: '0px',
    marginLeft: '-10px'
  },
  SubmitHeader: {
    display: 'inline'
  },
  EmployeeSubmitHeaderTooltip: {
    marginTop: '-45px',
    marginLeft: '90px'
  },
  addEmployeeButtonContainer: {
    marginTop: '12px',
    display: 'inline'
  },
  addEmployeeButton: {
    textAlign: 'center',
    fontSize: '14px',
    cursor: 'pointer',
    width: '100px',
    borderRadius: '8px',
    padding: '1px',
    backgroundColor: 'white'
  },
  addEmployeeButtonTooltip: {
    marginTop: '-66px',
    marginLeft: '92px',
    zIndex: '1',
    cursor: 'pointer'
  },
  EmailEditButton: {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  EditButtonContainer: {
    marginLeft: '60px'
  },
  SettingsLayoutContainer: {
    margin: '0 auto',
    marginLeft: '40px',
    marginRight: '40px',
    paddingBottom: '12px',
    width: '100%',
    fontSize: '14px'
  },
  SettingsPassword: {
    width: '100px',
    marginLeft: '89px'
  },
  SettingsEmail: {
    width: '100px',
    marginLeft: '115px',
    display: 'flex',
    flexDirection: 'column'
  },
  SettingsName: {
    width: '100px',
    marginLeft: '112px'
  },
  EmailContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '2px solid white'
  },
  addEmployeeContainer: {
    marginTop: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButton: {
    alignSelf: 'center',
    marginTop: '24px',
    width: '100px',
    borderRadius: '4px',
    fontSize: '12px'
  },
  separatorLine: {
    justifySelf: 'center',
    width: '97%',
    margin: '0 auto',
    height: '2px',
    backgroundColor: 'grey',
    marginBottom: '16px',
    marginTop: '16px'
  },
  rowFlex: {
    marginLeft: '6px',
    marginRight: '6px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row'
  },
  searchTextField: {
    borderColor: 'black',
    fontSize: '24px',
    width: '70%',
    height: '60px',
    marginRight: '6px',
    marginTop: '60px',
    marginLeft: '-180px',
    paddingLeft: '4px'
  },
  filtersCheckbox: {
    fontSize: '10px',
    marginRight: '4px',
    fontWeight: 'bold'
  },
  filtersList: {
    overflowY: 'auto',
    height: '80px',
    marginTop: '36px',
    textAlign: 'left'
  },
  filterContainerHeader: {
    float: 'left',
    marginTop: '2px',
    marginLeft: '4px'
  },
  submittalDateFilterContainer: {
    marginTop: '28px',
    height: '146x',
    maxWidth: '400px',
    padding: '6px',
    border: '2px solid black'
  },
  timesheetTileTableBodyHeadHovered: {
    cursor: 'pointer',
    display: 'table',
    width: '100%',
    tableLayout: 'fixed',
    backgroundColor: 'lightgrey'
  },
  timesheetTileTableBody: {
    display: 'block',
    height: '150px',
    overflow: 'auto'
  },
  timesheetTileTableBodyHead: {
    cursor: 'pointer',
    display: 'table',
    width: '100%',
    tableLayout: 'fixed'
  },
  timesheetTileTable: {
    fontSize: '12px',
    width: '270px'
  },
  adminTimesheetsContainer: {
    display: 'inline'
  },
  adminTimesheetTile: {
    ...adminTimesheetTile
  },
  adminTimesheetTileHover: {
    ...adminTimesheetTile,
    backgroundColor: 'white'
  },
  downloadLink: {
    fontWeight: 'bold'
  },
  AddEmployeeNameContainer: {
    width: '100%',
    marginBottom: '6px'
  },
  AddEmployeeNameLabel: {
    marginLeft: '6px' 
  },
  AddEmployeeNameInput: {
    position: 'relative',
    width: '180px',
    marginLeft: '30px'
  },
  AddEmployeeEmailContainer: {
    width: '100%'
  },
  AddEmployeeEmailLabel: {
    marginLeft: '6px'
  },
  AddEmployeeEmailInput: {
    position: 'relative',
    width: '180px',
    marginLeft: '34px'
  },
  AddEmployeePasswordContainer: {
    marginTop: '6px',
    width: '100%'
  },
  AddEmployeePasswordLabel: {
    marginLeft: '6px'
  },
  AddEmployeePasswordInput: {
    position: 'relative',
    width: '180px',
    marginLeft: '4px'
  },
  recentTimesheet: {
    paddingBottom: '16px',
    textAlign: 'center',
    borderBottom: '8px solid grey',
    paddingLeft: '6px'
  },
  recentTimesheetsList: {
    opacity: '0.85',
    marginTop: '28px',
    padding: '0',
    overflowY: 'scroll',
    maxHeight: '70vh',
    margin: '12px'
  },
  timesheetHeader: {
    marginLeft: '64px',
    float: 'left',
    fontWeight: 'bold',
    fontSize: '24px'
  },
  adminSidePanel: {
    display: 'flex',
    flexDirection: 'column',
    width: '230px',
    minWidth: '230px',
    borderRight: '1px solid gray',
    paddingTop: '12px'
  },
  adminSidePanelButton: {
    height: '24px',
    textAlign: 'center',
    fontSize: '20px',
    border: 'none',
    marginBottom: '12px',
    cursor: 'pointer',
    backgroundColor: 'lightgrey',
    borderBottom: '1px solid grey',
    paddingBottom: '6px'
  },
  employeesTableContainer: {
    marginTop: '90px',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  employeesTable: {
    width: '100%',
    cursor: 'pointer',
    border: CommonBorder,
    textAlign: 'left',
    marginLeft: '24px',
  },
  darkGrayBackground: {
    backgroundColor: 'darkgrey'
  },
  whiteBackground : {
    backgroundColor: 'white'
  },
  employeesTableCell: {
    borderBottom: CommonBorder,
    borderRight: CommonBorder,
    backgroundColor: 'white'
  },
  adminEmployeesLayoutContainer: {
    borderRadius: '2px',
    display: 'block',
    margin: '0 auto',
    marginLeft: '12px',
    width: '100%',
    paddingBottom: '32px'
  },
  DasboardContainer: {
    marginLeft: '26px',
    marginRight: '26px',
    display: 'flex',
    flexDirection: 'row',
    marginTop: '40px',
    backgroundColor: 'lightGray'
  },
  RecentlySubmittedContainer: {
    width: '80%'
  },
  SubmitContainer: {
    display: 'flex',
    borderLeft: '1px solid white',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    paddingBottom: '100px',
    minHeight: '400px',
    width: '100%'
  },
  RecentlySubmittedText: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
    textDecoration: 'underline'
  },
  SubmitTimesheetButton: {
    backgroundColor: '#3b5998',
    marginBottom: '28px',
    marginTop: '6px',
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bolder',
    color: 'white',
    width: '180px',
    borderRadius: '8px'
  },
  UploadButton: {
    padding: '10px',
    borderRadius: '4px'
  },
  StepsList: {
    listStylePosition: 'inside',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  Calendar: {
    marginTop: '-20px',
    backgroundColor: 'white',
    padding: '12px',
    borderRadius: '12px',
    marginBottom: '10px',
  },
  CalendarContainer: {
    display: 'inline',
    marginTop: '10px'
  },
  StepRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  redX: {
    alignSelf: 'center',
    marginTop: '3px',
    marginLeft: '6px',
    height: '20px',
    width: '20px',
  },
  h3: {
    width: '100%',
    textAlign: 'center'
  }
}
