import "./Dashboard.css";
import NavBar from "./Nav";
import { useState, useEffect, Navigate } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ReactPaginate from "react-paginate";
import AuthService from '../api/authService';


export default function Dashboard() {
  const authService = new AuthService();
  const isLoggedIn = authService.isLogedIn();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fix, setFixed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookmarked, setIsBookmaked] = useState(false);


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
          'X-Token': localStorage.getItem('user'),
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
          'X-Token': localStorage.getItem('user')
        }
      });
      let url = `/courses`;
      url += `?page=${currentPage}&per_page=${10}`;
      if (searchQuery) {
        url += `?q=${searchQuery}`;
      }
      const response = await api.get(url);
      try {
        if (searchQuery) {
          setData(response.data.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.provider.toLowerCase().includes(searchQuery.toLowerCase())
          ));
        } else {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    try {
      if (isLoggedIn) {
        fetchData();
        verification()
      } else {
        window.location.href = "/login"
      }
    } catch (error) {
      console.log(error)
    }
    
  }, [currentPage, isLoggedIn, searchQuery]);


  async function addBookmark(itemId) {
    const api = axios.create({
      baseURL: 'http://127.0.0.1:1245',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': localStorage.getItem('user')
      }
    });
    const url = `/users/me/bookmarks`;
    const prams = `?action=add`
    const data = {
      courseId: itemId 
    };
    try {
        const response = await api.put(url + prams, data);
        setIsBookmaked(true)
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
        console.log('Bookmark added successfully', response.status);
    } catch (error) {
      console.log('Bookmark could not be added', error);
    }
  }

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const Previous = () => setCurrentPage(currentPage - 1)
  const Next = () => setCurrentPage(currentPage + 1)

  window.addEventListener("scroll", scrollFixed);
return isLoggedIn ? (
      <div className="DashBoard" id="dashboard">
          {!isVerified && ( 
          <p className={fix ? "verified verified_hidden": "verified"}>Please  Verify your Email waiting... </p>
          ) : (
            <div className="confirmed"></div>
          )
          }
          {isBookmarked && (
            <div className="alert alert-success d-flex align-items-center Alter-succs
              " role="alert">
              <svg
                  className="bi flex-shrink-0 me-2"
                  width="24"
                  height="24"
                  role="img"
                  aria-label="Success:"
                  >
                </svg>
                <div>Bookmark Added Successfully</div>
              </div>
            )}
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
              pageCount={72}
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
              ) : (data
                .map(item => (
                <Card key={item.id} style={{ width: '26rem', height: '30rem' }} className="Card_spacing">
                  <span className="bookmarks" onClick={() => { addBookmark(item.id)
                  }
                  }
                  >🔖<span className="tooltiptext">Bookmark</span></span>
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
              pageCount={72}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              previousLabel={"Prev"}
              nextLabel={"Next"}
              onPagePrev={Previous}
              onPageNext={Next}
            />
          </section>
        </div>
      </div>
    ) : (<Navigate to="/" />)
}