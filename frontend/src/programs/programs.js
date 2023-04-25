import Nav from "./Nav";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ReactPaginate from "react-paginate";
import "./programs.css";


function Programs() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fix, setFixed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);


  function scrollFixed() {
    if (window.scrollY >= 1) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }

  useEffect(() => {
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

    fetchData();
  }, [currentPage, searchQuery]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const Previous = () => setCurrentPage(currentPage - 1)
  const Next = () => setCurrentPage(currentPage + 1)

  window.addEventListener("scroll", scrollFixed);
    return (
      <div className="content" id="programs">
        <Nav />
        <div className="content-program_heading">
          <header className={fix ? "Titles Fixeds": "Titles"}>
            <Container className="Heading_title">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search For Courses"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </InputGroup>
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
          </header>
          <section className="content-body">
            <Container className="content-details">
            {isLoading ? (
                <div className="Loader">Loading please  wait...</div>
              ) : (data
                .map(item => (
                <Card key={item.id} style={{ width: '26rem', height: '30rem' }} className="Card_spacing">
                  <Card.Img variant="top" src={item.imageUrl} />
                  <Card.Body>
                    <Card.Title className="Card_title">{item.provider}</Card.Title>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                    <Button variant="primary disabled"><a className="Linking" href={item.url} target="_blank" rel="noreferrer">Visit Website</a></Button>
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
    );
  }

  export default Programs;