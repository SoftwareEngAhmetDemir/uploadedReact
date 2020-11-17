import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useTranslation } from 'react-i18next';
import UploadImgView from '../../helpers/uploadImgView.helper';
import { AuthContext } from '../../../Context/AuthContext';

import {
  FormControl,
  DialogContentText,
  FormGroup,
  FormHelperText,
  Card,
  Button,
  Typography,
  TextField,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';

import { GroupAdd, Delete, Save } from '@material-ui/icons';

import '../../../assets/css/style.css';
let ENDPOINT = ''

export default function ContentEdit(props) {
  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [openalert, seTopenalert] = useState(false);
  const { gState, seTgState } = useContext(AuthContext);

  const [state, setState] = useState({
    title: '',
    text: '',
    images: [],
  });

  function getContentData() {
    axios.get(ENDPOINT+`/content/nedir/${props.match.params.id}`).then((response) => {
      setState({
        ...state,
        _id: response.data._id,
        title: response.data.title,
        images: response.data.images,
        text: response.data.text,
      });
    });
  }

  useEffect(() => {
    getContentData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    let imgpath = state.images;

    if (gState.uploadPictures) {
      const data = new FormData();
      for (var x = 0; x < gState.uploadPictures.length; x++) {
        data.append('file', gState.uploadPictures[x]);
      }

      await axios
        .post(ENDPOINT+'/uploadimg/uploadimg/' + 'nedir', data)
        .then((res) => {
          imgpath = res.data.map((images) => {
            return images.path.replace('..\\public', '');
          });
          // delete old file
          axios.post(ENDPOINT+'/uploadimg/removefile', { file: state.images });
        })
        .catch((err) => {
          console.log('upload fail');
        });
      seTgState({ ...gState, uploadPictures: '' });
    }

    const Content = {
      title: state.title,
      text: state.text,
      images: imgpath,
    };

    axios
      .post(ENDPOINT+`/content/nedir/${props.match.params.id}`, Content)
      .then((res) => {
        if (res.data.variant == 'error') {
          enqueueSnackbar(t('customerNotUpdated') + res.data.messagge, {
            variant: res.data.variant,
          });
        } else {
          enqueueSnackbar(t('customerUpdated'), {
            variant: res.data.variant,
          });
          history.push('/panel/nedirlist');
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteData = (id) => {
    axios.delete(ENDPOINT+`/content/nedir/${id}`).then((res) => {
      enqueueSnackbar(t('Content Deleted'), {
        variant: res.data.variant,
      });
      history.push('/panel/nedirlist');
    });
  };

  return (
    <div className='containerP'>
      <ValidatorForm autoComplete='off' onSubmit={onSubmit}>
        <Grid item container spacing={3}>
          <Grid item container md={9} className='panelGridRelative'>
            <Card className='panelLargeIcon'>
              <GroupAdd fontSize='large' />
            </Card>
            <div className='listViewPaper'>
              <Typography
                component='h1'
                variant='h6'
                color='inherit'
                noWrap
                style={{ width: '100%' }}
                className='typography'
              >
                {t('Edit Content')}
                <Tooltip title={t('Delete Content')}>
                  <Button
                    variant='outlined'
                    color='primary'
                    style={{
                      float: 'right',
                      marginRight: '115px',
                    }}
                    onClick={() => {
                      seTopenalert(true);
                    }}
                  >
                    <Delete />
                  </Button>
                </Tooltip>
                <Dialog
                  open={openalert}
                  onClose={() => {
                    seTopenalert(false);
                  }}
                >
                  <DialogTitle>{t('Delete Content')}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {t('deleteInfoText1')}
                      <br />
                      {t('deleteInfoText2')}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        seTopenalert(false);
                      }}
                      color='primary'
                    >
                      {t('cancel')}
                    </Button>
                    <Button
                      onClick={() => {
                        deleteData(state._id);
                      }}
                      color='primary'
                      autoFocus
                    >
                      {t('delete')}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Typography>
              <Grid item container sm={12}>
                <Grid container item sm={4} spacing={0}>
                  <FormGroup className='FormGroup'>
                    <FormControl>
                      <TextValidator
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant='outlined'
                        margin='dense'
                        label={t('Content Title')}
                        value={state.title}
                        onChange={(e) => {
                          setState({
                            ...state,
                            title: e.target.value,
                          });
                        }}
                        required
                      />
                      <FormHelperText>
                        {t('You Need a Content Title')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>

                <Grid container item sm={12} spacing={0}>
                  <FormGroup className='FormGroup'>
                    <FormControl>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant='outlined'
                        label={t('Content Text')}
                        multiline
                        margin='normal'
                        value={state.text}
                        onChange={(e) => {
                          setState({
                            ...state,
                            text: e.target.value,
                          });
                        }}
                      />
                      <FormHelperText>
                        {t('You Need a Content Text')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
            </div>
            <div className='saveButtonPlace'>
              <Button
                type='submit'
                onClick={onSubmit}
                className='glow-on-hover'
              >
                <Save fontSize='small' style={{ marginRight: '15px' }} />
                {t('save')}
              </Button>
            </div>
          </Grid>
          <Grid container item md={3} className='panelGridRelative'>
            <div className='listViewPaper'>
              <FormGroup className='FormGroup'>
                <FormControl>
                  {state.images.map((image) => {
                    return (
                      <Fragment>
                        <img
                          style={{ width: '150px', margin: '0 auto' }}
                          src={image}
                        />
                        <br />
                      </Fragment>
                    );
                  })}
                  <UploadImgView
                    singleImage={false}
                    buttonText={t('Resim Seçiniz')}
                  />
                </FormControl>
              </FormGroup>
            </div>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  );
}
