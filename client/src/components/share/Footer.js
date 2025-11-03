import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: (theme.vars || theme).palette.background.paper,
}));

const Spacer = styled(Box)({
    backgroundColor: '#f0f0f0',
    height: '3px',
});

export default function InteractiveList() {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const lines1 = [
        { primary: 'אודות', secondary: 'נוסף 1' },
        { primary: 'הסיפור שלי', secondary: 'נוסף 2' },
        { primary: 'המועדון שלנו', secondary: 'נוסף 3' },
        { primary: 'סניפים', secondary: 'נוסף 3' },
        { primary: 'דרושים', secondary: 'נוסף 3' }
    ];
    const lines2 = [
        { primary: 'תקנון האתר', secondary: 'נוסף 1' },
        { primary: 'תנאי שימוש באתר', secondary: 'נוסף 2' },
        { primary: 'טבלת מידות', secondary: 'נוסף 3' },
        { primary: 'נהלי החלפה והחזרה ', secondary: 'נוסף 3' },
        { primary: 'תנאי משלוחים', secondary: 'נוסף 1' },
    ];
    const lines3 = [
        { primary: '? זקוקים לעזרה ', secondary: 'נוסף 1' },
        { primary: 'יצירת קשר', secondary: 'נוסף 2' },
        { primary: 'שאלות נפוצות', secondary: 'נוסף 3' },
        { primary: 'הסדרי נגישויות', secondary: 'נוסף 3' },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Spacer />
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Demo>
                        <List dense={dense}>
                            {lines1.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={item.primary}
                                        secondary={secondary ? item.secondary : null}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Demo>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Demo>
                        <List dense={dense}>
                            {lines2.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={item.primary}
                                        secondary={secondary ? item.secondary : null}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Demo>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Demo>
                        <List dense={dense}>
                            {lines3.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={item.primary}
                                        secondary={secondary ? item.secondary : null}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Demo>
                </Grid>
            </Grid>
            <Spacer/>
        </Box>
    );
}