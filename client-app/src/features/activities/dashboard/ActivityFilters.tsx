import React, { Fragment } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { Calendar } from 'react-widgets';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPredicate } from '../../../app/redux/activities/activities.selectors';
import { setPredicate } from '../../../app/redux/activities/activities.actions';

const ActivityFilters: React.FC<any> = ({predicate, setPredicate}) => {

  return (<Fragment>
    <Menu vertical size={'large'} style={{ width: '100%', marginTop: 50 }}>
      <Header icon={'filter'} attached color={'teal'} content={'Filters'} />
      <Menu.Item active={!predicate || predicate.key === 'all'} color={'blue'} name={'all'} content={'All Activities'}
      onClick={() => setPredicate('all', 'true')} />
      <Menu.Item active={predicate && predicate.key === 'isGoing'} color={'blue'} name={'username'} content={"I'm Going"} 
      onClick={() => setPredicate('isGoing', 'true')} />
      <Menu.Item active={predicate && predicate.key === 'isHost'} color={'blue'} name={'host'} content={"I'm hosting"}
      onClick={() => setPredicate('isHost', 'true')} />
    </Menu>
    <Header icon={'calendar'} attached color={'teal'} content={'Select Date'} />
    <Calendar
      onChange={date => setPredicate('startDate', date)}
      value={predicate && predicate['startDate'] || new Date()}
    />
  </Fragment>
)};

const mapStateToProps = createStructuredSelector<any, any>({
  predicate: selectPredicate
})

const mapDispatchToProps = (dispatch: any) => ({
  setPredicate: (key: string, value: string | Date) => dispatch(setPredicate(key, value))
})


export default connect(mapStateToProps, mapDispatchToProps)(ActivityFilters);