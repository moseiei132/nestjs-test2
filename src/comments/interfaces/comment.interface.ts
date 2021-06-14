export interface ICreateComment {
    userId: number

    topicId: number
  
    body: string
  }
  
  export interface IUpdateComment {
    userId: number

    commentId: number
  
    body: string
  }
  
  export interface IDeleteComment {
      userId: number
    
      commentId: number
    }
  
  export interface ICreateCommentReact {
    commentId: number
  
    userId: number
  
    reaction: string
  }
  