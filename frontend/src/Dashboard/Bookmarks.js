import "./Dashboard.css";
import NavBar from "./Nav";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


export default function Dashboard() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const api = axios.create({
        baseURL: 'http://127.0.0.1:1245',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': Cookies.get('session')
        }
      });
      let url = `/users/me/bookmarks`;
      if (searchQuery) {
        url += `?q=${searchQuery}`;
      }
      const response = await api.get(url);
      try {
        if (searchQuery) {
          setData(response.data.bookmarks.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.provider.toLowerCase().includes(searchQuery.toLowerCase())
          ));
        } else {
          setData(response.data.bookmarks);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [searchQuery]);

  async function addBookmark(itemId) {
    const api = axios.create({
      baseURL: 'http://127.0.0.1:1245',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': Cookies.get('session')
      }
    });
    const url = `/users/me/bookmarks`;
    const prams = `?action=del`
    const data = {
      courseId: itemId 
    };
    try {
      const response = await api.put(url + prams, data);
      console.log('Bookmark removed successfully', response.status);
    } catch (error) {
      console.log('Bookmark could not be added', error);
    }
  }

  if (isLoggedIn === "false") {
    window.location.href = "/";
  }else {
    return (
      <div className="DashBoard" id="dashboard">
        <NavBar />
        <div className="ContentArea">
          <header className="Title">
            <Container className="Heading_title">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search For Courses"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            </Container>
          </header>
          <section className="Content">
            <Container className="Details">
            {isLoading ? (
                <div className="Loader">Loading please  wait...</div>
              ) : ((data.length) === 0 ?
                <div className="Details_Lacking">
                <span className="hi">&#128075;</span>
                <div className="Loader">
                  Hi there! 
                  </div>
                  <div className="Loader">
                  Kindly bookmark Some Courses
                  </div>
                </div>
                :data.map(item => (
                <Card key={item.id} style={{ width: '26rem', height: '30rem' }} className="Card_spacing">
                  <span className="bookmarks_link_remover" onClick={() => { addBookmark(item.id)}}>X<span className="tooltiptext">Remove</span></span>
                  <Card.Img variant="top" src={item.imageUrl} />
                  <Card.Body>
                    <Card.Title className="Card_title">{item.provider}</Card.Title>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                    <Button variant="primary "><a className="Linking" href={item.url} target="_blank" rel="noreferrer">Visit Website</a></Button>
                  </Card.Body>
                </Card>
            )))
          }
            </Container>
          </section>
        </div>
      </div>
    );
  }
}
