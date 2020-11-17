import React, { forwardRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import MaterialTable, { MTableToolbar } from 'material-table';
import { useTranslation } from 'react-i18next';

import {
  DialogActions,
  DialogContent,
  Button,
  Dialog,
  Card,
  Tooltip,
  Grid,
  Typography,
} from '@material-ui/core';

import {
  Edit,
  GroupAdd,
  AddBox,
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
} from '@material-ui/icons';

import '../../../assets/css/style.css';
let ENDPOINT = ''

export default function ContentList() {
  const [t] = useTranslation();

  const [contentcategories, seTcontentcategories] = useState([]);

  const [data, seTdata] = useState([]);
  const [info, setInfo] = useState([]);
  const [open, seTopen] = useState(false);

  const menucategories_label = [{ title: t('Content Name'), field: 'name' }];
  const columns = [
    {
      title: t('Title'),
      field: 'title',
    },
    {
      title: t('Image'),
      field: 'images',
      render: (rowData) => (
        <div>
          <img src={rowData.images[0]} width='50' />
        </div>
      ),
    },
    {
      title: t('Text'),
      field: 'text',
    },
    {
      title: t('actions'),
      field: '_id',
      render: (rowData) => (
        <div>
          <Link to={`/panel/nedir/edit/${rowData._id}`}>
            <Edit />
          </Link>
        </div>
      ),
    },
  ];

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const getContentData = () => {
    axios.get(ENDPOINT+'/content/nedir').then((response) => {
      if (response.data.length > 0) {
        seTdata(response.data);
      }
    });
  };

  useEffect(() => {
    getContentData();
  }, []);

  const handleClickOpen = () => {
    seTopen(true);
  };

  const handleClose = () => {
    getContentData();
    seTopen(false);
  };

  return (
    <>
      <div className='containerP'>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
          <DialogContent style={{ padding: '0' }}>
            <MaterialTable
              title={t('Content')}
              icons={tableIcons}
              columns={menucategories_label}
              data={contentcategories}
              options={{
                exportButton: true,
              }}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .post(ENDPOINT+'/content/nedir/add', {
                        name: newData.name,
                      })
                      .then((response) => {
                        contentcategories.push(newData);
                        seTcontentcategories(contentcategories);
                      });
                    resolve();
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .post(ENDPOINT+`/content/nedir/${newData._id}`, {
                        name: newData.name,
                      })
                      .then((response) => {
                        const index = contentcategories.indexOf(oldData);
                        contentcategories[index] = newData;
                        seTcontentcategories(contentcategories);
                      });
                    resolve();
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .delete(ENDPOINT+`/content/nedir/${oldData._id}`)
                      .then((response) => {
                        const index = contentcategories.indexOf(oldData);
                        contentcategories.splice(index, 1);
                        seTcontentcategories(contentcategories);
                      });
                    resolve();
                  }),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              {t('okey')}
            </Button>
          </DialogActions>
        </Dialog>
        <Grid item container spacing={3}>
          <Grid container item md={9} className='panelGridRelative'>
            <Card className='panelLargeIcon'>
              <GroupAdd fontSize='large' />
            </Card>
            <Card className='listViewPaper'>
              <MaterialTable
                title=''
                icons={tableIcons}
                columns={columns}
                data={data}
                options={{
                  exportButton: true,
                  pageSize: 10,
                  grouping: true,
                }}
                components={{
                  Toolbar: (props) => (
                    <div>
                      <Typography
                        component='h5'
                        variant='h6'
                        color='inherit'
                        noWrap
                        className='typography'
                      >
                        {t('Content List')}
                      </Typography>
                      <Link to='/panel/nedircreate' className='addButtonPlace'>
                        <Tooltip title={t('Create Content')}>
                          <AddBox fontSize='large' className='addButtonIcon' />
                        </Tooltip>
                      </Link>
                      <MTableToolbar {...props} />
                      <div style={{ clear: 'both' }} />
                    </div>
                  ),
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
