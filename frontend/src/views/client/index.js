import React, { useEffect, useState } from 'react';
import axios from 'axios';
// node.js library that concatenates classes (strings)
import classnames from 'classnames';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  UncontrolledTooltip,
  Row,
} from 'reactstrap';

// core components
import { chartOptions, parseOptions } from 'variables/charts.js';

import Header from 'components/Headers/Header.js';
const Index = (props) => {
  const [clients, setClients] = useState([]);
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  const loadClients = () => {
    axios({
      url: `http://localhost:5000/api/client`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setClients(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    loadClients();
  }, {});
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className='mt--7' fluid>
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <h3 className='mb-0'>Card tables</h3>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Nom</th>
                    <th scope='col'>Cin</th>
                    <th scope='col'>Mobile</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Adresse</th>
                    <th scope='col'>Date Naissance</th>
                    <th scope='col' />
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => {
                    return (
                      <tr>
                        <th scope='row'>
                          <Media className='align-items-center'>
                            <Media>
                              <span className='mb-0 text-sm'>
                                {client.nom} {client.prenom}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td>{client.cin}</td>
                        <td>{client.mobile}</td>
                        <td>{client.e_mail}</td>
                        <td>{client.adresse}</td>
                        <td>{client.date_naissance}</td>
                        <td className='text-right'>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className='btn-icon-only text-light'
                              href='#pablo'
                              role='button'
                              size='sm'
                              color=''
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className='fas fa-ellipsis-v' />
                            </DropdownToggle>
                            <DropdownMenu className='dropdown-menu-arrow' right>
                              <DropdownItem
                                href='#pablo'
                                onClick={(e) => e.preventDefault()}
                              >
                                Modifier
                              </DropdownItem>
                              <DropdownItem
                                href='#pablo'
                                onClick={(e) => e.preventDefault()}
                              >
                                Supprimer
                              </DropdownItem>
                              <DropdownItem
                                href='#pablo'
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <CardFooter className='py-4'>
                <nav aria-label='...'>
                  <Pagination
                    className='pagination justify-content-end mb-0'
                    listClassName='justify-content-end mb-0'
                  >
                    <PaginationItem className='disabled'>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                        tabIndex='-1'
                      >
                        <i className='fas fa-angle-left' />
                        <span className='sr-only'>Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className='active'>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className='sr-only'>(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className='fas fa-angle-right' />
                        <span className='sr-only'>Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Index;
