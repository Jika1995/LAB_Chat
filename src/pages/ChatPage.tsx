import React, {useEffect, useState, MouseEvent} from 'react'
import { IUser } from './RegisterPage';
import {onSnapshot, collection, addDoc} from 'firebase/firestore';
import { Alert, Card, Grid, Divider, TextField, List, ListItem, ListItemText, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { auth, db } from "../firebase.config";
import { getFirestore } from "firebase/firestore";

export interface IMessage {
  user: IUser
  message: string
}

const ChatPage: React.FC = () => {
  
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const currentUser = auth.currentUser

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'messages'), doc => {
      doc.forEach((d: any) => {
        setMessages(prev => [...prev, d.data()])

      })
    })

    return () => {
      unsub();
    }

  }, [])


  const addMessageHandler = async (e: MouseEvent<HTMLButtonElement>) => {
      try {
        await addDoc(collection(db, 'messages'), {
          currentUser, message
        })

      } catch(e: any) {
        setError(e)
      }
      setMessage('')
  }

  return (
    <>
      {error && (
        <Alert severity='error' style={{marginBottom: 20}}>
          {error}
        </Alert>
      )}
      <div style={{background: '#8EBEFF', width: '100%', padding: '20px 0'}}>
      <Card style={{ width: '80%',
      margin: 'auto',
    backgroundColor: 'white', padding: '20px 0', borderRadius: '15px'}}>
                <List style={{
    height: '65vh',
    overflowY: 'auto', 
  }}>
    {messages?.map((msg, idx) => (
        <ListItem key={idx}>
                    <Grid container>
                        <Grid item xs={12} style={{alignItems: 'right'}} >
                            <ListItemText primary={msg.message}></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText secondary={msg.user.phoneNumber}></ListItemText>
                        </Grid>
                    </Grid>
        </ListItem>
    ))}
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={e => setMessage(e.target.value)} value={message}/>
                    </Grid>
                    <Grid item xs={1} alignItems="right">
                        <Fab color="primary" onClick={addMessageHandler}><SendIcon /></Fab>
                    </Grid>
                </Grid>
      </Card>
      </div>
      </>
  )
}

export default ChatPage

{/* <ListItem key="3">
<Grid container sx={{textAlign: 'right'}}>
    <Grid item xs={12}>
        <ListItemText style={{color: '#368CFF'}} primary="Cool. i am good, let's catch up!"></ListItemText>
    </Grid>
    <Grid item xs={12}>
        <ListItemText style={{alignItems: 'right'}} secondary="10:30"></ListItemText>
    </Grid>
</Grid>
</ListItem> */}