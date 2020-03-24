import React, { useState } from 'react';
import { Tab, Header, Card, Image, Button, Grid } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProfile, selectUploadingPhoto, selectAddPhotoMode, selectLoading } from '../../app/redux/profile/profile.selectors';
import { selectCurrentUser } from '../../app/redux/user/user.selectors';
import { setAddPhotoMode, uploadPhoto, setMainPhoto, deletePhoto } from '../../app/redux/profile/profile.actions';
import { IPhoto } from '../../app/models/profile';

const ProfilePhotos: React.FC<any> = ({ profile, currentUser, addPhotoMode, setAddPhotoMode,
     uploadPhoto, uploadingPhoto, setMainPhoto, deletePhoto, loading }) => {

    const [mainTarget, setMainTarget] = useState<string | undefined>(undefined);
    const [deleteTarget, setDeleteTarget] = useState<string | undefined>(undefined);

    const handleUploadImage = (photo: Blob, fileName: string) => {
        uploadPhoto(photo, fileName)
    }
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                    <Header floated='left' icon='image' content='Photos' />
                    {currentUser.username === profile.username &&
                        <Button onClick={() => setAddPhotoMode(!addPhotoMode)}
                            floated='right' basic content={addPhotoMode ? 'Cancel' : 'Add Photo'} />}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handleUploadImage} loading={uploadingPhoto} />
                    ) : (
                            <Card.Group itemsPerRow={5}>
                                {profile && profile.photos.map((photo: any) => (
                                    <Card key={photo.id}>
                                        <Image src={process.env.REACT_APP_API_ROOT_URL+photo.url} />
                                        {currentUser.username === profile.username &&
                                            <Button.Group fluid widths={2}>
                                                <Button onClick={e => {
                                                    setMainTarget(e.currentTarget.name)
                                                    setMainPhoto(photo);
                                                }} loading={loading && mainTarget === photo.id}
                                                name={photo.id} disabled={photo.isMain}
                                                basic positive content='Main' />
                                                
                                                <Button onClick={e => {
                                                    setMainTarget(undefined);
                                                    deletePhoto(photo.id);
                                                    setDeleteTarget(e.currentTarget.name)
                                                }}
                                                loading={loading && deleteTarget === photo.id}
                                                name={photo.id} disabled={photo.isMain} 
                                                basic negative icon='trash' />
                                            </Button.Group>
                                        }
                                    </Card>
                                ))}
                            </Card.Group>
                        )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

const mapStateToProps = createStructuredSelector<any, any>({
    profile: selectProfile,
    loading: selectLoading,
    addPhotoMode: selectAddPhotoMode,
    currentUser: selectCurrentUser,
    uploadingPhoto: selectUploadingPhoto
})


const mapDispatchToProps = (dispatch: any) => ({
    uploadPhoto: (photo: Blob, fileName: string) => dispatch(uploadPhoto(photo, fileName)),
    setAddPhotoMode: (mode: boolean) => dispatch(setAddPhotoMode(mode)),
    setMainPhoto: (photo: IPhoto) => dispatch(setMainPhoto(photo)),
    deletePhoto: (photoId: string) => dispatch(deletePhoto(photoId))
 });

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePhotos);
