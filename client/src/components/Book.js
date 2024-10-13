import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import BookPostForm from "./BookPostForm"; // Reuse the BookPostForm

const Book = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle book search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setBookData(null);

    try {
      // Simulate a book search request (you would replace this with your actual API call)
      const response = await fetch(`/api/books/search?title=${searchQuery}`);
      const data = await response.json();

      if (response.ok) {
        setBookData(data);
      } else {
        throw new Error("Book not found");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during search");
    } finally {
      setLoading(false);
    }
  };

  // Handle book buy request
  const handleBuyBook = async (bookId) => {
    setLoading(true);
    try {
      // Simulate buy request
      const response = await fetch(`/api/books/buy/${bookId}`, { method: "POST" });
      if (response.ok) {
        setSuccessMessage("Book purchased successfully!");
      } else {
        throw new Error("Unable to buy the book");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred while buying the book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">

      {/* Posting a Book Section */}
      <Row className="mb-5">
        <Col>
          <Card className="p-4">
            <h3 className="text-center">Post a Book for Sale</h3>
            <BookPostForm />
          </Card>
        </Col>
      </Row>

      {/* Buying a Book Section */}
      <Row>
        <Col>
          <Card className="p-4">
            <h3 className="text-center mb-4">Search and Buy a Book</h3>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            {/* Book Search Form */}
            <Form onSubmit={handleSearch} className="mb-4">
              <Row>
                <Col md={9}>
                  <Form.Group controlId="formSearch" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Search for a book by title"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <>
                        <FaSearch /> Search
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>

            {/* Display Search Results */}
            {bookData && (
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{bookData.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{bookData.author}</Card.Subtitle>
                  <Card.Text>{bookData.description}</Card.Text>
                  <Card.Text>
                    <strong>Price: </strong> ${bookData.price}
                  </Card.Text>

                  <Button
                    variant="success"
                    onClick={() => handleBuyBook(bookData._id)}
                    disabled={loading}
                    className="w-100"
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <>
                        <FaShoppingCart /> Buy Now
                      </>
                    )}
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Book;