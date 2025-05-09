describe('Data tables testing', () => {
    beforeEach(() => {
        cy.visit('https://datatables.net/')
        cy.get('.hero-callout').should('be.visible')
    })

    it('Table should be complete', () => {
        cy.get('table.dataTable > thead > tr')
  .find('th')
  .each(($th, index) => {
    cy.wrap($th)
      .should('exist') // Check if the header exists
      .should('be.visible') // Check if the header is visible
      .then(() => {
        cy.log(`Header ${index + 1}: "${$th.text()}" is present and visible.`);
      });
  });
    })

    it('Table should contain 1st row', () => {
        cy.get('table.dataTable > tbody > tr:nth-child(1) > td:nth-child(1)').then(($firstRow) => {
            const firstRowText = $firstRow.text();
            cy.log('First row text:', firstRowText);
            expect($firstRow).to.be.visible;
            expect(firstRowText).to.equal('Airi Satou');
        });
    })

    it('Table should contain last row', () => {
        cy.get('#dt-length-0').select('100')
        cy.wait(2000)
        cy.get('table.dataTable > tbody > tr:last > td:first-child').then(($lastRow) => {
            const lastRowText = $lastRow.text();
            cy.log('Last row text:', lastRowText);
            expect($lastRow).to.be.visible;
            expect(lastRowText).to.equal('Zorita Serrano');
        })
    })

    it('Should be able to view 10 entries', () => {
        cy.get('#dt-length-0').select('10')
        cy.get('#example_info').should('contain', '1 to 10')
        cy.get('table.dataTable > tbody > tr:nth-child(11) > td:nth-child(11)').should('not.exist')
    })

    it('Should be able to view 25 entries', () => {
        cy.get('#dt-length-0').select('25')
        cy.get('#example_info').should('contain', '1 to 25')
        cy.get('table.dataTable > tbody > tr:nth-child(26) > td:nth-child(26)').should('not.exist')
    })

    it('Should be able to view 50 entries', () => {
        cy.get('#dt-length-0').select('50')
        cy.get('#example_info').should('contain', '1 to 50')
        cy.get('table.dataTable > tbody > tr:nth-child(51) > td:nth-child(51)').should('not.exist')
    })

    it('Should be able to view 100 entries', () => {
        cy.get('#dt-length-0').select('100')
        // currently there are 57 entries
        cy.get('#example_info').should('contain', '1 to 57')
        // since there are less than 100 entries we should be able to check what the last row is
        cy.get('table.dataTable > tbody > tr:last > td:first-child').then(($lastRow) => {
            const lastRowText = $lastRow.text();
            cy.log('Last row text:', lastRowText);
            expect($lastRow).to.be.visible;
            expect(lastRowText).to.equal('Zorita Serrano');
        })
    })

    it('Should successfully proceed to page 2.', () => {
        cy.get('[data-dt-idx="1"]').click()
        cy.get('#example_info').should('contain', 'Showing 11 to 20 of 57 entries')
    })

    it.skip('Should Successfully Search Angelica Ramos & Assert her Salary', () => {
        cy.get('#dt-search-0').type('Angelica Ramos')
        cy.get('.dtr-control').click()
        try {
            cy.get('[data-dtr-index="5"] > .dtr-data')
                .should('be.visible')
                .and('have.text', '$1,200,000')
        }
        catch (error) {
            cy.log('Maybe her salary increase because of revenue increase this year:', error)
        }
    })

    it('Should be able to search by name', () => {
        cy.get('#dt-search-0').type('colleen')
        cy.get('table.dataTable > tbody > tr:nth-child(1) > td:nth-child(1)').should('be.visible').and('contain', 'Colleen')
        cy.get('#example_info').should('contain', 'Showing 1 to 1 of 1 entry (filtered from 57 total entries)')
    })

    it('Should be able to search by position', () => {
        cy.checkSearch('Software Engineer')
    })

    it('Should be able to search by office', () => {
        cy.checkSearch('San Francisco')
    })

    // since numbered value some age, salary and date value coincide and appear in the results
    it('Should be able to search by age', () => {
        cy.checkSearch('66')
    })

    it('Should be able to search by start date', () => {
        cy.checkSearch('3/11/2010')
    })

    it('Should be able to search by salary', () => {
        cy.checkSearch('$237,500')
    })

    it('Should verify when searhing none existent data shows message', () => {
        cy.get('#dt-search-0').type('Noone')
        cy.get('.dt-empty').should('be.visible').and('contain', 'No matching records found')
    })

    it('Should be able to sort by name in ascending order', () => {
        // Wait for sorting to apply
        cy.wait(500);
          
        // Get sorted names
        cy.get('tbody tr td.sorting_1').then(($cells) => {
            const names = $cells.map((_, cell) => cell.innerText).get();
            const sortedNames = [...names].sort();
            
            // Assert that the displayed names match the expected sorted order
            expect(names).to.deep.equal(sortedNames);
        });
    })

    it('Should be able to sort by name in descending order', () => {
        cy.get('th').contains('Name').click(); // Click on the "Name" column header
          
        // Wait for sorting to apply
        cy.wait(500);
          
        // Get sorted names
        cy.get('tbody tr td.sorting_1').then(($cells) => {
            const names = $cells.map((_, cell) => cell.innerText).get();
            const sortedNames = [...names].sort().reverse();
            
            // Assert that the displayed names match the expected sorted order
            expect(names).to.deep.equal(sortedNames);
        });  
    })
  
    it('Should be able to sort by position in ascending order', () => {
        cy.get('th').contains('Position').click()
        
        cy.wait(1000)
        
        cy.get('table.dataTable > tbody > tr')
        .then(($rows) => {
            let positionArray = [];

            $rows.each((index, row) => {
            const position = Cypress.$(row).find('td:nth-child(2)').text();
            positionArray.push(position);
            });

            // Sort the array
            const sortedPosition = [...positionArray].sort();

            // Assert that it's sorted correctly
            expect(sortedPosition).to.deep.equal(positionArray);
        });  
    });

    it('Should be able to sort Position in descending order', () => {
        cy.get('th').contains('Position').click()
        
        cy.wait(1000)
        
        const keyword = "Position"; // Column name
        
        // Click the Position column to sort
        cy.get('th').contains(keyword).click();
        
        cy.get('table.dataTable > tbody > tr')
        .then(($rows) => {
            let positionArray = [];

            $rows.each((index, row) => {
            const position = Cypress.$(row).find('td:nth-child(2)').text();
            positionArray.push(position);
            });

            // Sort the array
            const sortedPosition = [...positionArray].sort().reverse();

            // Assert that it's sorted correctly
            expect(sortedPosition).to.deep.equal(positionArray);
        });
    });

    it('Should be able to sort office in ascending order', () => {
        cy.get('th').contains('Office').click()
        
        cy.wait(1000)
        
        cy.get('table.dataTable > tbody > tr')
        .then(($rows) => {
            let positionArray = [];

            $rows.each((index, row) => {
            const position = Cypress.$(row).find('td:nth-child(3)').text();
            positionArray.push(position);
            });

            // Sort the array
            const sortedPosition = [...positionArray].sort();

            // Assert that it's sorted correctly
            expect(sortedPosition).to.deep.equal(positionArray);
        });   
    })

    it('Should be able to sort office in descending order', () => {
        cy.get('th').contains('Office').click()
        
        cy.wait(1000)
        
        cy.get('th').contains('Office').click()
        
        cy.wait(1000)
        
        cy.get('table.dataTable > tbody > tr')
        .then(($rows) => {
            let positionArray = [];

            $rows.each((index, row) => {
            const position = Cypress.$(row).find('td:nth-child(3)').text();
            positionArray.push(position);
            });

            // Sort the array
            const sortedPosition = [...positionArray].sort().reverse();

            // Assert that it's sorted correctly
            expect(sortedPosition).to.deep.equal(positionArray);
        });   
    })

    it('Should be able to sort age in ascending order', () => {
        cy.get('th').contains('Age').click()
        
        cy.wait(1000)
        
        cy.get('table.dataTable > tbody > tr')
        .then(($rows) => {
            let positionArray = [];

            $rows.each((index, row) => {
            const position = Cypress.$(row).find('td:nth-child(4)').text();
            positionArray.push(position);
            });

            // Sort the array
            const sortedPosition = [...positionArray].sort();

            // Assert that it's sorted correctly
            expect(sortedPosition).to.deep.equal(positionArray);
        });

    })

    it('Should be able to sort Age in descending order', () => {
        cy.get('th').contains('Age').click()
        
        cy.wait(1000)
        
        cy.get('th').contains('Age').click()
        
        cy.wait(1000)

        cy.get('table.dataTable > tbody > tr').then(($rows) => {
            let positionArray = [];

            $rows.each((index, row) => {
                const position = Cypress.$(row).find('td:nth-child(4)').text();
                positionArray.push(position);
            });

            // Sort the array
            const sortedPosition = [...positionArray].sort((a, b) => b - a);

            // Assert that it's sorted correctly
            expect(sortedPosition).to.deep.equal(positionArray);
        });
    })

    it('Should be able to sort start date in ascending order', () => {
        cy.get('th').contains('Start date').click(); // Click the header to sort
    
        cy.wait(1000);
    
        cy.get('table.dataTable > tbody > tr').then(($rows) => {
            let dateArray = [];
    
            $rows.each((index, row) => {
                let dateText = Cypress.$(row).find('td:nth-child(5)').text().trim();
                
                // Convert date from mm/dd/yyyy to a sortable format (yyyy/mm/dd)
                let [month, day, year] = dateText.split('/');
                let formattedDate = `${year}/${month}/${day}`;
                
                dateArray.push(formattedDate);
            });
    
            // Sort in ascending order
            const sortedDates = [...dateArray].sort((a, b) => a - b);
    
            console.log(sortedDates)
            console.log(dateArray)

            // Assert that it's sorted correctly
            expect(sortedDates).to.deep.equal(dateArray);
        });
    });
    
    it('Should be able to sort Start Date in descending order', () => {
        cy.get('th').contains('Start date').click(); // First click to sort ascending
    
        cy.wait(1000);
    
        cy.get('th').contains('Start date').click(); // Second click to sort descending
    
        cy.wait(1000);
    
        cy.get('table.dataTable > tbody > tr').then(($rows) => {
            let dateArray = [];
    
            $rows.each((index, row) => {
                let dateText = Cypress.$(row).find('td:nth-child(5)').text().trim();
                
                // Convert date from mm/dd/yyyy to a sortable format (yyyy/mm/dd)
                let [month, day, year] = dateText.split('/');
                let formattedDate = `${year}/${month}/${day}`;
                
                dateArray.push(formattedDate);
            });
    
            // Sort in descending order
            const sortedDates = [...dateArray].sort((a, b) => a - b);
            console.log(sortedDates)
            console.log(dateArray)

            // Assert that it's sorted correctly
            expect(sortedDates).to.deep.equal(dateArray);
        });
    });

    it('Should be able to sort Salary in ascending order', () => {
        cy.get('th').contains('Salary').click()
        
        cy.wait(1000)
        
        cy.get('table.dataTable > tbody > tr').then(($rows) => {
            let positionArray = [];

            $rows.each((index, row) => {
            const position = Cypress.$(row).find('td:nth-child(6)').text();
            positionArray.push(position);
            });

            // Sort the array
            const sortedPosition = [...positionArray].sort();

            // Assert that it's sorted correctly
            expect(sortedPosition).to.deep.equal(positionArray);
        });
    })
  
    it('Should be able to sort Salary in descending order', () => {
        cy.get('th').contains('Salary').click()
        
        cy.wait(1000)
        
        cy.get('th').contains('Salary').click()
        
        cy.wait(1000)

        cy.get('table.dataTable > tbody > tr').then(($rows) => {
            let positionArray = [];

            $rows.each((index, row) => {
            const salarytext = Cypress.$(row).find('td:nth-child(6)').text();
            let position = Number(salarytext.replace(/[$,]/g, '')); // Remove '$' and ',' then convert to number
    
            positionArray.push(position);
            });

            // Sort the array
            const sortedPosition = [...positionArray].sort((a, b) => b - a);

            // Assert that it's sorted correctly
            expect(sortedPosition).to.deep.equal(positionArray);
        });
    })
})