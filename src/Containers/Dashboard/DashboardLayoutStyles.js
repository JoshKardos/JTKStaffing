const CommonBorder = '1px solid black'
export default {
  recentTimesheet: {
    paddingBottom: '16px',
    textAlign: 'center',
    borderBottom: '1px solid black',
    paddingLeft: '6px'
  },
  recentTimesheetsList: {
    margin: '0',
    marginTop: '28px',
    padding: '0',
    minHeight: '400px',
    maxHeight: '400px',
    overflowY: 'scroll'
  },
  adminSidePanel: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '230px',
    minWidth: '230px',
    height: '80px',
    borderRadius: '2px',
    paddingTop: '12px',
    marginLeft: '4px'
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
    marginBottom: '12px'
  },
  employeesTable: {
    cursor: 'pointer',
    width: '80%',
    margin: '12px',
    border: CommonBorder,
    textAlign: 'left'
  },
  employeesTableCell: {
    borderBottom: CommonBorder,
    borderRight: CommonBorder,
    backgroundColor: 'lightgrey'
  },
  adminEmployeesLayoutContainer: {
    backgroundColor: 'white',
    marginLeft: '12px',
    width: '100%',
    textAlign: 'center',
    paddingBottom: '8px'
  },
  DasboardContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '12px'
  },
  RecentlySubmittedContainer: {
    backgroundColor: 'white',
    maxWidth: '260px',
    minWidth: '260px'
  },
  SubmitContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'wheat',
    paddingBottom: '120px',
    minHeight: '400px',
    maxHeight: '400px',
    width: '100%'
  },
  RecentlySubmittedText: {
    textAlign: 'center',
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
