import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import ButtonAsLink from './ButtonAsLink';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

//import TOGGLE_FAVORITE mutation
import { TOGGLE_FAVORITE } from '../gql/mutation';

//import GET_MY_FAVORITES query to refetch
import { GET_MY_FAVORITES } from '../gql/query';

const FavoriteNote = props => {
  //store the note's favorite count as state
  const [count, setCount] = useState(props.favoriteCount);
  //store if the user has favorited the note as a state
  const [favorited, setFavorited] = useState(
    //check if the note exists in the user's favorites list
    props.me.favorites.filter(note => note.id === props.noteId).length > 0
  );
  //TOGGLE_FAVORITE mutation hook
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: props.noteId
    },
    //refetch the GET_MY_FAVORITES query to update cache
    refetchQueries: [{ query: GET_MY_FAVORITES }]
  });

  //if the user has favorited the note,display the option to remove the favorite, else
  //display to add as a favorite
  return (
    <React.Fragment>
      {favorited ? (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(false);
            setCount(count - 1);
          }}
        >
          <abbr title="Remove Favorite">
            <FavoriteOutlinedIcon style={{ color: '#ff0000' }} />
          </abbr>
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(true);
            setCount(count + 1);
          }}
        >
          <abbr title="Add Favorite">
            <FavoriteBorderOutlinedIcon style={{ color: '#ff0000' }} />
          </abbr>
        </ButtonAsLink>
      )}
      {count}
    </React.Fragment>
  );
};

export default FavoriteNote;
