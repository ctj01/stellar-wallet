import { useAppSelector } from "../state/store/Store";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
export const AccountDetails = () => {
    const accountSelector = useAppSelector(state => state.accountDetails.Account);
    const balances = accountSelector?.balances || [];

    const balanceFormatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        currency: 'USD',
        minimumFractionDigits: 2,
        roundingMode: 'floor'
    });

    return (
        <div>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListSubheader component="div" id="nested-list-subheader" style={{ fontSize: "1.2rem" }}>
                    Assets
                </ListSubheader>
                {balances.map((balance, index) => {
                    return (
                        <ListItem key={index}>
                            <ListItemIcon>
                               
                            </ListItemIcon>
                            <ListItemText 
                            primaryTypographyProps={
                               {
                                variant: "h6",

                               }
                            }
                            secondaryTypographyProps={
                                {
                                    variant: "subtitle1"
                                
                                }
                            }
                          
                            primary={balanceFormatter.format(Number(balance.balance))} secondary={balance.asset_type === "native" ? "XLM" : balance.asset_code} />
                        </ListItem>
                    )
                })}
            </List>
        </div>
    )
    
    

}