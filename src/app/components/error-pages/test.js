<Popper
              open={open2}
              anchorEl={anchorRef.current}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper style={{ border: '1px solid', borderRadius: '4px' }}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open2}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose} style={{ width: '24rem' }}>
                          <img src={require('../assets/images/faces/face4.jpg')}
                            style={{ maxHeight: '60px', maxWidth: '60px' }} className="rounded-circle" />
                          <div className="ml-2">
                            <div >Mạnh Hùng</div>
                            <div className="text-muted">
                              <span>Hôm qua đi đâu vậy - 1 ngày trước</span>
                            </div>
                          </div>
                        </MenuItem>
                        <MenuItem onClick={handleClose} style={{ width: '24rem' }}>
                          <img src={require('../assets/images/faces/face3.jpg')}
                            style={{ maxHeight: '60px', maxWidth: '60px' }} className="rounded-circle" />
                          <div className="ml-2">
                            <div >Mạnh Hùng</div>
                            <div className="text-muted">
                              <span>Hôm qua đi đâu vậy - 1 ngày trước</span>
                            </div>
                          </div>
                        </MenuItem>
                        <MenuItem onClick={handleClose} style={{ width: '24rem' }}>
                          <img src={require('../assets/images/faces/face2.jpg')}
                            style={{ maxHeight: '60px', maxWidth: '60px' }} className="rounded-circle" />
                          <div className="ml-2">
                            <div >Mạnh Hùng</div>
                            <div className="text-muted">
                              <span>Hôm qua đi đâu vậy - 1 ngày trước</span>
                            </div>
                          </div>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>




{/* <Popper

open={open2}
anchorEl={anchorRef.current}
transition
disablePortal
>
{({ TransitionProps, placement }) => (
  <Paper>
    <ClickAwayListener onClickAway={handleClose}>
      <Autocomplete
        label="Choose a country"
        id="combo-box-demo"
        open={open2}
        // onChange={changeStatus}
        options={status}
        getOptionLabel={(option) => option.name}
        style={{ width: '20rem' }}
        renderInput={(params) => <TextField style={{ fontSize: '15px' }} placeholder="Tìm kiếm trong hộp tin"
          {...params}
          InputProps={{ ...params.InputProps, disableUnderline: true }} />}
        renderOption={option => {
          return (
            <Fragment >
              <img src={require('../assets/images/faces/face3.jpg')}
                style={{ maxHeight: '60px', maxWidth: '60px' }} className="rounded-circle" />
              <div className="ml-2" >
                <div style={{ fontSize: '15px' }}>Mạnh Hùng</div>
                <div className="text-muted" style={{ fontSize: '12px' }}>
                  <span>Hôm qua đi đâu vậy - 1 ngày trước</span>
                </div>
              </div>
            </Fragment>
          )
        }}
      />
    </ClickAwayListener>
  </Paper> */}