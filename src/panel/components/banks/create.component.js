import React, { forwardRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../Context/AuthContext';
import UploadImgView from '../helpers/uploadImgView.helper';

import Moment from 'moment';

import MaterialTable from 'material-table';
import Select2 from '@material-ui/core/Select';

import {
  FormControl,
  FormGroup,
  FormHelperText,
  Card,
  Button,
  Typography,
  TextField,
  Tooltip,
  FormLabel,
  Switch,
  FormControlLabel,
  InputAdornment,
  RadioGroup,
  Radio,
  TableRow,
  TableCell,
  TableBody,
  Table,
  MenuItem,
  Grid,
} from '@material-ui/core';

import {
  AddBox,
  PlaylistAddCheck,
  ContactMail,
  Edit,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
  Receipt,
  Save,
} from '@material-ui/icons';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import tr from 'date-fns/locale/tr';

import '../../assets/css/style.css';
let ENDPOINT = ''

export default function EstatePropsCreate(props) {
  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { user, gState, seTgState } = useContext(AuthContext);

  const [dataItems, seTdataItems] = useState([]);
  const [state, seTstate] = useState({
    created: Date.now(),
    name: '',
    code: '',
    order: 0,
    img: '',
  });
  const onClickHandlerUploadImg = () => {
    const data = new FormData();
    for (var x = 0; x < gState.pictures.length; x++) {
      data.append('file', gState.pictures[x]);
    }
    axios
      .post(ENDPOINT+'/banks/uploadimg', data)
      .then((res) => {
        // then print response status
        console.log(res.data[0].path);
        console.log('upload success');
      })
      .catch((err) => {
        // then print response status
        console.log('upload fail');
      });
  };

  // componentDidMount = useEffect
  useEffect(() => {}, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    let imgpath = state.images;

    if (gState.uploadPictures) {
      const data = new FormData();
      for (var x = 0; x < gState.uploadPictures.length; x++) {
        data.append('file', gState.uploadPictures[x]);
      }

      await axios
        .post(ENDPOINT+'/uploadimg/uploadimg/' + 'banks', data)
        .then((res) => {
          imgpath = res.data[0].path.replace('build', '');
        })
        .catch((err) => {
          console.log('upload fail');
        });
      seTgState({ ...gState, uploadPictures: '' });
    }

    const sendData = {
      created_user: { name: user.name, id: user.id },
      created: Date.now(),
      name: state.name,
      code: state.code,
      order: state.order,
      images: imgpath,
    };

    axios
      .post(ENDPOINT+'/banks/add', sendData)
      .then((res) => {
        console.log(res.data);
        if (res.data.variant === 'error') {
          enqueueSnackbar(
            t('Emlak Özelliği Eklendi Eklenemedi') + res.data.messagge,
            {
              variant: res.data.variant,
            }
          );
        } else {
          enqueueSnackbar(t('Emlak Özelliği Eklendi') + res.data.messagge, {
            variant: res.data.variant,
          });
          // navigate
          history.push('/panel/Bankslist');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='containerP'>
      <ValidatorForm autoComplete='off' onSubmit={onSubmit}>
        <Grid item container spacing={3}>
          <Grid item container md={12} className='panelGridRelative'>
            <Card className='panelLargeIcon'>
              <Receipt fontSize='large' />
            </Card>
            <Card className='listViewPaper'>
              <Typography
                component='h1'
                variant='h6'
                color='inherit'
                noWrap
                className='typography'
              >
                {t('Banka Ekle')}
              </Typography>
              <Grid item container sm={12} spacing={4}>
                <Grid item sm={2}>
                  <FormGroup className='FormGroup'>
                    <FormControl>
                      <TextValidator
                        variant='outlined'
                        margin='dense'
                        label={t('Sıra')}
                        type='number'
                        value={state.order}
                        onChange={(e) => {
                          seTstate({
                            ...state,
                            order: e.target.value,
                          });
                        }}
                      />
                      <FormHelperText>{t('Sıra numarası')}</FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>

                <Grid item sm={3}>
                  <FormGroup className='FormGroup'>
                    <FormControl>
                      <TextValidator
                        variant='outlined'
                        margin='dense'
                        label={t('Banka Adı')}
                        value={state.name}
                        onChange={(e) => {
                          seTstate({
                            ...state,
                            name: e.target.value,
                          });
                        }}
                      />
                      <FormHelperText>
                        {t('Banka Adını yazınız.')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>

                <Grid item sm={3}>
                  <FormGroup className='FormGroup'>
                    <FormControl>
                      <TextValidator
                        variant='outlined'
                        margin='dense'
                        label={t('Banka Kodu')}
                        value={state.code}
                        onChange={(e) => {
                          seTstate({
                            ...state,
                            code: e.target.value,
                          });
                        }}
                      />
                      <FormHelperText>
                        {t('Bankanın Ön kodunu giriniz örn. AYF-')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item sm={4}>
                  <FormGroup className='FormGroup'>
                    <FormControl>
                      <UploadImgView singleImage={true} />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
            </Card>
            <div className='saveButtonPlace'>
              <Button type='submit' className='glow-on-hover'>
                <Save fontSize='small' style={{ marginRight: '15px' }} />
                {t('save')}
              </Button>
            </div>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  );
}
