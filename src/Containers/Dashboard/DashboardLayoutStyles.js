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
  addEmployeeContainer: {
    display: 'flex',
    flexDirection: 'column'
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
    backgroundColor: 'white'
  },
  timesheetTileTableBody: {
    display: 'block',
    height: '100px',
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
    backgroundColor: 'lightgrey'
  },
  downloadLink: {
    fontWeight: 'bold'
  },
  recentTimesheet: {
    paddingBottom: '16px',
    textAlign: 'center',
    borderBottom: '8px solid grey',
    paddingLeft: '6px'
  },
  recentTimesheetsList: {
    opacity: '0.85',
    backgroundColor: 'white',
    marginTop: '28px',
    padding: '0',
    overflowY: 'scroll',
    maxHeight: '400px',
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
    backgroundColor: 'white',
    width: '230px',
    minWidth: '230px',
    height: '84px',
    // height: '146px',
    borderRadius: '2px',
    paddingTop: '12px'
  },
  adminSidePanelButton: {
    height: '24px',
    textAlign: 'center',
    fontSize: '20px',
    border: 'none',
    marginBottom: '12px',
    cursor: 'pointer'
  },
  addEmployeeButton: {
    width: '100px',
    marginBottom: '12px'
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
    marginBottom: '14px'
  },
  employeesTableCell: {
    borderBottom: CommonBorder,
    borderRight: CommonBorder,
    backgroundColor: 'lightgrey'
  },
  adminEmployeesLayoutContainer: {
    borderRadius: '2px',
    display: 'block',
    margin: '0 auto',
    backgroundColor: 'white',
    marginLeft: '12px',
    width: '100%',
    paddingBottom: '8px'
  },
  DasboardContainer: {
    marginLeft: '26px',
    marginRight: '26px',
    display: 'flex',
    flexDirection: 'row',
    marginTop: '12px'
  },
  RecentlySubmittedContainer: {
    backgroundColor: 'grey',
    maxWidth: '260px',
    minWidth: '260px',
    maxHeight: '460px'
  },
  SubmitContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'wheat',
    paddingBottom: '120px',
    minHeight: '400px',
    width: '100%'
  },
  RecentlySubmittedText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    width: '100%',
    textDecoration: 'underline'
  },
  SubmitTimesheetButton: {
    backgroundColor: 'rgb(46, 46, 253)',
    marginBottom: '28px',
    marginTop: '6px',
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bolder',
    color: 'white'
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
  CalendarContainer: {
    backgroundColor: 'white',
    padding: '12px',
    borderRadius: '12px',
    marginBottom: '10px',
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
