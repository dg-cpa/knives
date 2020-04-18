import csv

# establishing the input file on cwd
filein = 'Quickbooks Desktop GL Detail.csv'
# dictionary storage for subaccounts
account = {'parentName': '','subName': ''}

# opening the source file
with open(filein) as f, open('output2000.csv', 'w', newline='') as o:
        reader = csv.reader(f)
        writer = csv.writer(o)
        try:
                for row in reader:
                        # column for parent
                        parent = row[1]
                        # column for sub
                        
                        sub = row[2]
                        date = row[7]
                        name = row[11]
                        memo = row[13]
                        amount = row[17]
                        balance = row[19]

                        # establishing the header row, solely identified by Type
                        if row[5] == 'Type':
                                writer.writerow((date,'Account',name,memo,amount))

                        # skipping over renaming any parent account
                        elif parent[:5] == 'Total':
                                next

                        # updating a new parent account
                        elif parent != '':
                                newParent = {'parentName':parent}
                                account.update(newParent)

                        # resetting the subaccount after every total
                        elif sub[:5] == 'Total':
                                newSub = {'subName':''}
                                account.update(newSub)
                                next
                        # updating a new subaccount
                        elif sub != '':
                                newSub = {'subName':sub}
                                account.update(newSub)

                        # writing transactions to CSV based on amount not being blank
                        elif row[7] != '':
                            
                                # adjusting syntax if current subaccount blank
                                if account['subName'] == '':
                                    writer.writerow((date,account['parentName'],name,memo,amount))
                                # adding : for subaccounts
                                else:
                                    writer.writerow((date,account['parentName'] + ':' + account['subName'],name,memo,amount))
                        else:
                                next
                        
        # simple error and exception handling for CSV error
        except csv.Error as e:
                sys.exit('file {}, line {}: {}'.format(filein, reader.line_num, e))
