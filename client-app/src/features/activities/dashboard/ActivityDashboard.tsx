import React, { useEffect } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityFilters from './ActivityFilters';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadActivities, loadMore } from '../../../app/redux/activities/activities.actions';
import { selectLoadingInitial, selectPage, selectTotalPages, selectLoadingNext } from '../../../app/redux/activities/activities.selectors';

const ActivityDashboard: React.FC<any> = ({ loadActivities, loadingInitial, loadingNext, page, totalPages, loadMore }) => {

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

    if (page === 0)
     window.scrollTo(0,0);
    
    return (
        <Grid>
            <Grid.Column width={10}>
                {loadingInitial && page === 0 ? <ActivityListItemPlaceholder /> : (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={loadMore}
                        hasMore={!loadingNext && page + 1 <= totalPages}
                        initialLoad={false}
                    >
                        <ActivityList />
                    </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
}

const mapStateToProps = createStructuredSelector<any, any>({
    loadActivities: loadActivities,
    loadingInitial: selectLoadingInitial,
    page: selectPage,
    totalPages: selectTotalPages,
    loadingNext: selectLoadingNext
});

const mapDispatchToProps = (dispatch: any) => ({
    loadActivities: () => dispatch(loadActivities()),
    loadMore: () => dispatch(loadMore()),

})

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDashboard);
