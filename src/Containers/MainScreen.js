import React, { Component } from 'react'
// import { connect } from 'react-redux'
import MenuBar from '../Components/MenuBar/MenuBar'

class MainScreen extends Component {
  render() {
    return (
      <MenuBar />
    )
  }
}


// const mapStateToProps = state => ({
//   status: state,
//   currentLayout: state.LayoutReducers.layoutReducer.currentLayout
// })

// const mapDispatchToProps = dispatch => ({
//   setHome: () => dispatch(setHomeLayout())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
export default MainScreen
