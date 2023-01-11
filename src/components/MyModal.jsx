import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setUsernameAction } from "../redux/actions";

const mapStateToProps = (state) => ({
  userName: state.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  setReduxUsername: (name) => {
    dispatch(setUsernameAction(name));
  },
});

const MyModal = ({ setReduxUsername }) => {
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(true);

   useEffect(() => {
    setReduxUsername(username);
  }, [username]); 
  return (
    <>
      <Modal show={showModal}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form className="w-100 ml-1">
              <Form.Group className="w-100 mx-0 d-flex">
                <Form.Control
                  size="sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="enter your username"
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setShowModal(false);
                setReduxUsername(username);
              }}
            >
              Sign in
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);
