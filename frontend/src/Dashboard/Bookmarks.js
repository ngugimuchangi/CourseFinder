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
import ReactPaginate from "react-paginate";


export default function Dashboard() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fix, setFixed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  function scrollFixed() {
    if (window.scrollY >= 1) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }

  useEffect(() => {
    async function verification() {
      const api = axios.create({
        baseURL: 'http://127.0.0.1:1245',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': Cookies.get('session'),
        }
      });
        let user = '/users/me';
        const response = await api.get(user)
        if (response.data.verified) {
          setIsVerified(true)
        } else {
          setIsVerified(false)
        }
      }
    // fetching data from database
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
      url += `?page=${currentPage}&per_page=${10}`;
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
    verification()
  }, [currentPage, searchQuery]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const Previous = () => setCurrentPage(currentPage - 1)
  const Next = () => setCurrentPage(currentPage + 1)

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
  window.addEventListener("scroll", scrollFixed);
  if (isLoggedIn === "false") {
    window.location.href = "/";
  }else {
    return (
      <div className="DashBoard" id="bookmarks">
        {!isVerified ? ( 
          <p className={fix ? "verified verified_hidden": "verified"}>Please  Verify your Email waiting... </p>
          ) : (
            <div className="confirmed"></div>
          )
          }
        <NavBar />
        <div className="ContentArea">
          <header className={fix ? "Title Fixed": "Title"}>
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
          <ReactPaginate
              pageCount={6}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              previousLabel={"Prev"}
              nextLabel={"Next"}
              onPagePrev={Previous}
              onPageNext={Next}
            />
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
            <ReactPaginate
              pageCount={6}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              previousLabel={"<- Prev"}
              nextLabel={"Next ->"}
              onPagePrev={Previous}
              onPageNext={Next}
            />
          </section>
        </div>
      </div>
    );
  }
}