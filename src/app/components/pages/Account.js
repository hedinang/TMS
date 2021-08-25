import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import TableAccount from '../tables/TableAccount'
import { faPlusSquare, faAllergies, faEye } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GridList, GridListTile, Checkbox } from '@material-ui/core'
import { action } from '../../redux/actions/actions'
import { DialogCreateAccount, AlertResult } from '../dialog/DialogAccount';
function Account(props) {
  let [selected, setSelected] = useState([])
  let [checked, setChecked] = useState(0)
  let [show, setShow] = useState('none')
  let [create, setCreate] = useState({ open: false })
  let [disabled, setDisabled] = useState(false)
  let [alert, setAlert] = useState({})
  let [reload, setReload] = useState(false)
  useEffect(() => {
    selected = props.state.selectedAccount.reduce((array, e) => {
      if (e.checked === true) {
        array.push(
          {
            field: e.field,
            title: e.title,
            checked: e.checked
          })
        checked += 1
      }
      return array

    }, [])
    setSelected(selected)
    setChecked(checked)
    if (checked === selected.length) setDisabled(true)
  }, [])
  let clickShow = () => {
    if (show === 'none') setShow('inline')
    else setShow('none')
  }
  let clickAll = () => {
    selected = selected.map(e => {
      e.checked = true
      return e
    })
    checked = selected.length
    setSelected(selected)
    setChecked(checked)
  }
  let changeShow = (event, id) => {
    if (event.target.checked) {
      checked += 1
      selected = selected.map(e => {
        if (e.field === id)
          e.checked = true
        return e
      })
    } else {
      checked -= 1
      selected = selected.map(e => {
        if (e.field === id)
          e.checked = false
        return e
      })
    }
    props.dispatch(action('CHANGE_SELECTED_ACCOUNT', selected))
    setSelected(selected)
    setChecked(checked)

    if (checked === selected.length)
      setDisabled(true)
    else
      setDisabled(false)
  }
  let addItem = () => {
    setCreate({
      open: true
    })
  }
  let cancel = () => {
    setCreate({
      open: false
    })
  }
  let confirm = () => {
    setCreate({ open: false })
    setReload(!reload)
    setAlert({
      show: true,
      message: 'Tạo người dùng thành công'
    })
  }
  let close = () => {
    setAlert({
      show: false
    })
  }
  return (
    <div>
      <div className="mb-2" style={{ textAlign: 'center' }}>Danh sách nhân sự</div>
      <div>
        <div>
          <button
            style={{
              textAlign: 'text-top', background: 'white', height: '2rem', outlineStyle: 'none',
              color: 'black', width: '8rem', borderRadius: '5px', border: 'none'
            }}
            onClick={clickShow}>
            <FontAwesomeIcon icon={faEye} className='mr-2' />
                HIỂN THỊ
                </button>
          <button
            style={{
              textAlign: 'text-top', background: 'white', height: '2rem', outlineStyle: 'none',
              color: 'black', width: '8rem', borderRadius: '5px', border: 'none',
            }}
            onClick={addItem}
          >
            <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                TẠO MỚI
                </button>
        </div>
        <div style={{ display: `${show}` }} >
          <DialogCreateAccount
            data={create}
            confirm={confirm}
            cancel={cancel}
          />
          <button disabled={disabled}
            style={{
              textAlign: 'text-top', background: '#00d25b', height: '2rem', outlineStyle: 'none', border: 'none',
              color: 'white', width: '6rem', borderRadius: '5px', marginTop: '5px'
            }}
            onClick={clickAll}>
            <FontAwesomeIcon icon={faAllergies} className='mr-2' />
                Chọn tất
                </button>
          <div >Có {checked}/{selected.length} loại được chọn hiển thị</div>
          <GridList cellHeight={50} cols={6} >
            {selected.map(e => {
              return <GridListTile key={e.field}>
                <div >
                  <Checkbox
                    style={{ color: '#fc424a' }}
                    checked={e.checked}
                    onClick={event => {
                      changeShow(event, e.field)
                    }}
                  />
                  {e.title}
                </div>
              </GridListTile>
            })}
          </GridList>
        </div>
      </div >
      <TableAccount selectedAccount={selected} reload={reload} />
      <AlertResult
        data={alert} close={close}
      />
    </div >
  )
}
function select(state) {
  return {
    state: state.reducer
  }
}
export default connect(select)(Account)