import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useTranslation } from 'react-i18next';
import UploadImgView from '../../helpers/uploadImgView.helper';

import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  FormHelperText,
  Card,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';

import { GroupAdd, Save } from '@material-ui/icons';
import { AuthContext } from '../../../Context/AuthContext';
let ENDPOINT = ''

export default function ContentCreate() {
  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [gropBoxOpen, seTgropBoxOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { gState, seTgState } = useContext(AuthContext);

  const [state, setState] = useState({
    title: '',
    text: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const Content = {
      created_user: { name: user.name, id: user.id },
      title: state.title,
      text: state.text,
    };

    axios.post(ENDPOINT+'/content/iletisim/add', Content).then((res) => {
      if (res.data.variant == 'error') {
        enqueueSnackbar(t('Content Not Added') + res.data.messagge, {
          variant: res.data.variant,
        });
      } else {
        enqueueSnackbar(t('Content Added'), {
          variant: res.data.variant,
        });
        // navigate
        history.push('/panel/iletisimlist');
      }
    });
  };

  return (
    <div className='containerP'>
      <ValidatorForm autoComplete='off' onSubmit={onSubmit}>
        <Grid item container spacing={3} style={{ display: 'flex' }}>
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
                className='typography'
              >
                {t('Content Create')}
              </Typography>
              <Grid item container sm={12}>
                <Grid container item sm={4} spacing={0}>
                  <FormGroup className='FormGroup'>
                    <FormControl>
                      <TextValidator
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
                      <FormHelperText>{t('You Need a Name')}</FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid container item sm={12} spacing={0}>
                  <FormGroup className='FormGroup'>
                    <FormControl>
                      <TextField
                        variant='outlined'
                        label={t('Content Description')}
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
                        {t('You Need a Description')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
            </div>
            <div className='saveButtonPlace'>
              <Button type='submit' className='glow-on-hover'>
                <Save fontSize='small' style={{ marginRight: '15px' }} />{' '}
                {t('save')}
              </Button>
            </div>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  );
}
