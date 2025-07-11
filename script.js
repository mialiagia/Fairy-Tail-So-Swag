
const fairyTailMark = '<img src="https://e7.pngegg.com/pngimages/766/288/png-clipart-logo-fairy-tail-symbol-fairy-tail-emblem-text-thumbnail.png" alt="Fairy Tail" class="guildmark">';
const sabertoothMark = '<img src="https://e7.pngegg.com/pngimages/134/869/png-clipart-fairy-tail-sabertooth-guild-logo-tooth-fairy-text-trademark-thumbnail.png" alt="Sabertooth" class="guildmark">';




const fairyTailFacts = [
    "Natsu has motion sickness and can't ride any form of transportation without getting sick!",
    "Gray has a habit of unconsciously stripping off his clothes due to his ice magic training.",
    "Lucy's favorite food is strawberry cake, and she's a huge fan of the novel 'Love Lucky'.",
    "Erza's favorite food is strawberry cake, just like Lucy!",
    "Wendy is the youngest Dragon Slayer in the series, being only 12 years old when first introduced.",
    "Gajeel was originally a member of Phantom Lord before joining Fairy Tail.",
    "Makarov, the Fairy Tail guild master, can use Giant Magic to grow to enormous size.",
    "The Fairy Tail guild hall has been destroyed multiple times throughout the series.",
    "Happy, Natsu's cat companion, was born from an egg that Natsu found and raised.",
    "Carla, Wendy's cat companion, can see into the future.",
    "Laxus is Makarov's grandson and the son of Ivan Dreyar.",
    "Mirajane was once the strongest female mage in Fairy Tail before Erza.",
    "Juvia was originally an enemy from Phantom Lord before falling in love with Gray.",
    "The Fairy Tail guild mark is a blue fairy symbol that members get tattooed on their bodies.",
    "Natsu's scarf was given to him by Igneel, his adoptive dragon father.",
    "Lucy's keys for summoning Celestial Spirits are passed down through her family.",
    "Gray learned his ice magic from his master, Ur, who sacrificed herself to seal Deliora.",
    "Erza's Requip magic allows her to instantly change armor and weapons.",
    "The Fairy Tail guild was founded by Mavis Vermillion, the first master.",
    "Natsu's fire magic comes from Igneel, the Fire Dragon King.",
    "Lucy's mother, Layla Heartfilia, was also a Celestial Spirit Mage.",
    "The Fairy Tail guild is located in Magnolia Town in the Kingdom of Fiore.",
    "Gray's rivalry with Natsu started when they were children training under different masters.",
    "Erza's strict personality comes from her traumatic childhood in the Tower of Heaven."
];




function initStickyNote() {
    const stickyNote = document.getElementById('sticky-note');
    const funFactText = document.getElementById('fun-fact');
    
    if (stickyNote && funFactText) {
        funFactText.textContent = fairyTailFacts[0];
        
        let currentFactIndex = 0;
        
        stickyNote.addEventListener('click', function(e) {
            // Prevent event bubbling and default behavior
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            // Add tearing animation
            stickyNote.classList.add('tearing');
            
            // Change fact after animation
            setTimeout(() => {
                currentFactIndex = (currentFactIndex + 1) % fairyTailFacts.length;
                funFactText.textContent = fairyTailFacts[currentFactIndex];
                
                // Remove tearing class
                stickyNote.classList.remove('tearing');
            }, 500);
        });
    }
}






function initTicTacToe() {
    const board = document.querySelectorAll('.cell');
    const statusDiv = document.getElementById('status');
    const restartBtn = document.getElementById('restart');
    let gameActive = true;
    let currentPlayer = 'X'; 
    let gameState = ["", "", "", "", "", "", "", "", ""];
    
    function handleCellClick(e) {
        // Completely isolate the game from search functionality
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation(); // Add this to stop all other event listeners
        
        const idx = e.target.getAttribute('data-index');
        if (gameState[idx] !== "" || !gameActive || currentPlayer !== 'X') return;
        gameState[idx] = currentPlayer;
        e.target.innerHTML = currentPlayer === 'X' ? fairyTailMark : sabertoothMark;
        if (checkWin(currentPlayer)) {
            statusDiv.textContent = "Fairy Tail wins!";
            gameActive = false;
            
            
            setTimeout(() => {
                try {
                    const gameContainer = document.getElementById('tic-tac-toe');
                    if (gameContainer) {
                        const rect = gameContainer.getBoundingClientRect();
                        const gameCenterX = (rect.left + rect.width / 2) / window.innerWidth;
                        const gameCenterY = (rect.top + rect.height / 2) / window.innerHeight;
                        
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: {
                                x: gameCenterX,
                                y: gameCenterY
                            }
                        });
                    } else {
                        
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { x: 0.5, y: 0.5 }
                        });
                    }
                } catch (error) {
                    console.error('Confetti error:', error);
                    
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { x: 0.5, y: 0.5 }
                    });
                }
            }, 100);
            
            setTimeout(restartGame, 2000);
            return;
        }
        if (gameState.every(cell => cell !== "")) {
            statusDiv.textContent = "It's a draw!";
            gameActive = false;
            setTimeout(restartGame, 2000);
            return;
        }
        currentPlayer = 'O';
        statusDiv.textContent = "Sabertooth's turn...";
        setTimeout(computerMove, 500); 
    }
    
    function computerMove() {
        if (!gameActive) return;

        
        for (let i = 0; i < 9; i++) {
            if (gameState[i] === "") {
                gameState[i] = 'O';
                if (checkWin('O')) {
                    board[i].innerHTML = sabertoothMark;
                    statusDiv.textContent = "Sabertooth wins!";
                    gameActive = false;
                    setTimeout(restartGame, 2000);
                    return;
                }
                gameState[i] = "";
            }
        }

        
        for (let i = 0; i < 9; i++) {
            if (gameState[i] === "") {
                gameState[i] = 'X';
                if (checkWin('X')) {
                    gameState[i] = 'O';
                    board[i].innerHTML = sabertoothMark;
                    currentPlayer = 'X';
                    statusDiv.textContent = "Fairy Tail's turn!";
                    return;
                }
                gameState[i] = "";
            }
        }

        
        let emptyCells = [];
        gameState.forEach((cell, idx) => {
            if (cell === "") emptyCells.push(idx);
        });
        if (emptyCells.length === 0) return;
        let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState[move] = 'O';
        board[move].innerHTML = sabertoothMark;

        if (checkWin('O')) {
            statusDiv.textContent = "Sabertooth wins!";
            gameActive = false;
            setTimeout(restartGame, 2000);
            return;
        }
        if (gameState.every(cell => cell !== "")) {
            statusDiv.textContent = "It's a draw!";
            gameActive = false;
            setTimeout(restartGame, 2000);
            return;
        }
        currentPlayer = 'X';
        statusDiv.textContent = "Fairy Tail's turn!";
    }
    
    function checkWin(player) {
        const winPatterns = [
            [0,1,2],[3,4,5],[6,7,8], 
            [0,3,6],[1,4,7],[2,5,8], 
            [0,4,8],[2,4,6]
        ];
        return winPatterns.some(pattern =>
            pattern.every(idx => gameState[idx] === player)
        );
    }
    
    function restartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ["", "", "", "", "", "", "", "", ""];
        board.forEach(cell => cell.innerHTML = "");
        statusDiv.textContent = "Fairy Tail's turn!";
    }
    
    // Add event listeners with capture phase to ensure they run first
    board.forEach(cell => {
        cell.removeEventListener('click', handleCellClick); // Remove any existing listeners
        cell.addEventListener('click', handleCellClick, true); // Use capture phase
    });
    
    if (restartBtn) {
        restartBtn.removeEventListener('click', restartGame);
        restartBtn.addEventListener('click', restartGame, true);
    }
    statusDiv.textContent = "Fairy Tail's turn!";
}







// Comprehensive search index with all content from your pages
const comprehensiveSearchIndex = {
    // Character pages
    'natsu': {
        pages: ['second.html', 'Natsu.html'],
        keywords: ['fire dragon slayer', 'igneel', 'motion sickness', 'fairy tail', 'dragon slayer magic', 'fire magic', 'scarf', 'happy', 'cat companion'],
        sections: ['character profile', 'abilities', 'background']
    },
    'lucy': {
        pages: ['second.html', 'Lucy.html'],
        keywords: ['celestial spirit mage', 'keys', 'strawberry cake', 'love lucky', 'layla heartfilia', 'celestial spirit magic', 'summoning'],
        sections: ['character profile', 'abilities', 'background']
    },
    'gray': {
        pages: ['second.html', 'Gray.html'],
        keywords: ['ice demon slayer', 'ur', 'deliora', 'stripping', 'ice magic', 'demon slayer magic', 'rivalry', 'natsu'],
        sections: ['character profile', 'abilities', 'background']
    },
    'erza': {
        pages: ['second.html', 'Erza.html'],
        keywords: ['requip magic', 'scarlet', 'armor', 'weapons', 'strawberry cake', 'tower of heaven', 'strict', 'strongest female mage'],
        sections: ['character profile', 'abilities', 'background']
    },
    
    // Guild pages
    'fairy tail': {
        pages: ['guilds.html'],
        keywords: ['mavis vermillion', 'magnolia town', 'kingdom of fiore', 'guild hall', 'makarov', 'blue fairy symbol', 'guild mark'],
        sections: ['guild information', 'location', 'members']
    },
    'phantom lord': {
        pages: ['guilds.html'],
        keywords: ['jose porla', 'gajeel', 'juvia', 'enemy guild', 'dark guild'],
        sections: ['guild information', 'members']
    },
    'sabertooth': {
        pages: ['guilds.html'],
        keywords: ['sting', 'rouge', 'white dragon slayer', 'shadow dragon slayer', 'rival guild'],
        sections: ['guild information', 'members']
    },
    
    // Magic pages
    'dragon slayer': {
        pages: ['magic.html'],
        keywords: ['fire dragon', 'lightning dragon', 'ice demon slayer', 'iron dragon', 'sky dragon', 'white dragon', 'shadow dragon', 'dragon force'],
        sections: ['magic types', 'abilities']
    },
    'celestial spirit': {
        pages: ['magic.html'],
        keywords: ['keys', 'summoning', 'contracts', 'zodiac spirits', 'golden keys', 'silver keys'],
        sections: ['magic types', 'summoning']
    },
    'requip': {
        pages: ['magic.html'],
        keywords: ['armor', 'weapons', 'instant change', 'erza scarlet', 'knight walker'],
        sections: ['magic types', 'abilities']
    },
    
    // Game and interactive elements
    'game': {
        pages: ['third.html'],
        keywords: ['tic tac toe', 'fairy tail vs sabertooth', 'take a break', 'fun facts', 'sticky notes'],
        sections: ['games', 'interactive']
    },
    'comments': {
        pages: ['comments.html', 'third.html'],
        keywords: ['share thoughts', 'leave comment', 'discussion', 'fairy tail fans'],
        sections: ['community', 'interaction']
    }
};

// Enhanced search function with content indexing
function enhancedSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    // Direct page matches
    const directMatches = {
        'natsu': 'Natsu.html',
        'lucy': 'Lucy.html',
        'gray': 'Gray.html',
        'erza': 'Erza.html',
            'wendy': 'second.html',
            'gajeel': 'second.html',
            'juvia': 'second.html',
            'laxus': 'second.html',
            'mirajane': 'second.html',
            'fairy tail': 'guilds.html',
            'phantom lord': 'guilds.html',
            'sabertooth': 'guilds.html',
            'blue pegasus': 'guilds.html',
            'dragon slayer': 'magic.html',
            'fire dragon': 'magic.html',
            'lightning dragon': 'magic.html',
            'ice demon slayer': 'magic.html',
            'demon slayer': 'magic.html',
            'celestial spirit': 'magic.html',
            'requip': 'magic.html',
            'take over': 'magic.html',
            'water magic': 'magic.html',
            'memory make': 'magic.html',
        'archive magic': 'magic.html',
        'game': 'third.html',
        'tic tac toe': 'third.html',
        'fun facts': 'third.html',
        'comments': 'comments.html',
        'home': 'index.html',
        'main': 'index.html'
    };
    
    // Check for direct matches first
    for (let term in directMatches) {
        if (searchTerm.includes(term)) {
            navigateToPage(directMatches[term], searchTerm);
            return;
        }
    }
    
    // Check comprehensive index for keyword matches
    for (let category in comprehensiveSearchIndex) {
        const categoryData = comprehensiveSearchIndex[category];
        
        // Check if search term matches category
        if (searchTerm.includes(category)) {
            navigateToPage(categoryData.pages[0], searchTerm);
            return;
        }
        
        // Check keywords within category
        for (let keyword of categoryData.keywords) {
            if (searchTerm.includes(keyword) || keyword.includes(searchTerm)) {
                navigateToPage(categoryData.pages[0], searchTerm);
                return;
            }
        }
    }
    
    // If no matches found, show suggestions
    showSearchSuggestions(searchTerm);
}

// Function to navigate to page with search highlighting
function navigateToPage(page, searchTerm) {
    // Store search term for highlighting on the target page
    sessionStorage.setItem('searchHighlight', searchTerm);
    window.location.href = page;
}

// Function to show search suggestions
function showSearchSuggestions(searchTerm) {
    const suggestions = [];
    
    // Find partial matches in the comprehensive index
    for (let category in comprehensiveSearchIndex) {
        const categoryData = comprehensiveSearchIndex[category];
        
        if (category.includes(searchTerm) || searchTerm.includes(category)) {
            suggestions.push(category);
        }
        
        for (let keyword of categoryData.keywords) {
            if (keyword.includes(searchTerm) || searchTerm.includes(keyword)) {
                suggestions.push(keyword);
            }
        }
    }
    
   
    const uniqueSuggestions = [...new Set(suggestions)].slice(0, 10);
    
    if (uniqueSuggestions.length > 0) {
        const suggestionText = uniqueSuggestions.join(', ');
        alert(`No exact match found. Did you mean: ${suggestionText}?`);
    } else {
        alert(`No results found for: ${searchTerm}\n\nTry searching for: characters (Natsu, Lucy, Gray, Erza), guilds (Fairy Tail, Phantom Lord, Sabertooth), or magic types (Dragon Slayer, Celestial Spirit, Requip)`);
    }
}


function highlightSearchTerms() {
    const searchTerm = sessionStorage.getItem('searchHighlight');
    if (!searchTerm) return;
    
    // Clear the stored search term
    sessionStorage.removeItem('searchHighlight');
    
    // Find and highlight all instances of the search term
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        
        if (regex.test(text)) {
            const highlightedText = text.replace(regex, '<mark style="background-color: yellow; padding: 2px;">$1</mark>');
            const span = document.createElement('span');
            span.innerHTML = highlightedText;
            textNode.parentNode.replaceChild(span, textNode);
        }
    });
    
    // Scroll to first highlight
    const firstHighlight = document.querySelector('mark');
    if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Enhanced search input handling
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const suggestionsDiv = document.getElementById('suggestions');

    if (searchInput) {
        // Create comprehensive suggestions list
        const allSuggestions = [];
        
        // Add all categories and keywords
        for (let category in comprehensiveSearchIndex) {
            allSuggestions.push(category);
            allSuggestions.push(...comprehensiveSearchIndex[category].keywords);
        }
        
        // Add direct matches
        const directMatches = ['natsu', 'lucy', 'gray', 'erza', 'wendy', 'gajeel', 'juvia', 'laxus', 'mirajane', 'fairy tail', 'phantom lord', 'sabertooth', 'dragon slayer', 'celestial spirit', 'requip', 'game', 'comments', 'home'];
        allSuggestions.push(...directMatches);
        
        // Remove duplicates and sort
        const uniqueSuggestions = [...new Set(allSuggestions)].sort();
        
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length === 0) {
                suggestionsDiv.style.display = 'none';
                return;
            }
            
            const filteredSuggestions = uniqueSuggestions.filter(item => 
                item.toLowerCase().includes(query)
            );
            
            if (filteredSuggestions.length > 0) {
                suggestionsDiv.innerHTML = '';
                filteredSuggestions.slice(0, 8).forEach(suggestion => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.textContent = suggestion;
                    div.addEventListener('click', function() {
                        searchInput.value = suggestion;
                        suggestionsDiv.style.display = 'none';
                        enhancedSearch(suggestion);
                    });
                    suggestionsDiv.appendChild(div);
                });
                suggestionsDiv.style.display = 'block';
            } else {
                suggestionsDiv.style.display = 'none';
            }
        });

        document.getElementById('search-button').addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                enhancedSearch(query);
            }
        });

        // Handle Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    enhancedSearch(query);
                }
            }
        });

        // Prevent search from being triggered by clicks outside the search area
        document.addEventListener('click', function(e) {
            // Check if the click is on the game area or any game-related element
            const gameArea = document.getElementById('tic-tac-toe');
            const gameBoard = document.getElementById('board');
            const gameCells = document.querySelectorAll('.cell');
            const restartBtn = document.getElementById('restart');
            
            // Check if click is on any game element
            if (gameArea && (gameArea.contains(e.target) || 
                             gameBoard && gameBoard.contains(e.target) ||
                             Array.from(gameCells).some(cell => cell.contains(e.target)) ||
                             restartBtn && restartBtn.contains(e.target))) {
                return; // Don't hide suggestions if clicking on game
            }
            
            if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
                suggestionsDiv.style.display = 'none';
            }
        });
    }
    
    // Highlight search terms when page loads
    highlightSearchTerms();
});







let dropdownsEnabled = false; 

if (dropdownsEnabled) {
    document.querySelectorAll('.dropdown-toggle').forEach(function(button) {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content.style.display === "none" || content.style.display === "") {
                content.style.display = "block";
                this.textContent = this.textContent.replace("Show", "Hide");
            } else {
                content.style.display = "none";
                this.textContent = this.textContent.replace("Hide", "Show");
            }
        });
    });
}





function goBack() {
    window.history.back();
}





fetch('third.html')
  .then(response => response.text())
  .then(html => {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove the search wrapper if it exists
    const searchWrapper = tempDiv.querySelector('.search-wrapper');
    if (searchWrapper) {
      searchWrapper.remove();
    }
    
    // Get the remaining content
    const content = tempDiv.innerHTML;
    
    document.getElementById('third-content').innerHTML = content;
    if (typeof initTicTacToe === "function") {
      initTicTacToe();
    }
    
    setTimeout(initStickyNote, 100);
  });


document.addEventListener('DOMContentLoaded', function() {
    
    const commentBox = document.getElementById('comment-box');
    
    if (commentBox) {
        commentBox.addEventListener('click', function() {
            window.location.href = 'comments.html';
        });
    }

   
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name-input').value;
            const comment = document.getElementById('comment-input').value;
            const timestamp = new Date().toLocaleString();
            
            if (!name || !comment) {
                alert('Please fill in both name and comment fields!');
                return;
            }
            
            
            let comments = JSON.parse(localStorage.getItem('fairyTailComments') || '[]');
            
            
            comments.push({
                name: name,
                comment: comment,
                timestamp: timestamp
            });
            
            
            localStorage.setItem('fairyTailComments', JSON.stringify(comments));
            
           
            commentForm.reset();
            
            
            displayComments();
            
            alert('Comment posted successfully!');
        });
    }

    
    function displayComments() {
        const commentsDisplay = document.getElementById('comments-display');
        if (!commentsDisplay) return;
        
        const comments = JSON.parse(localStorage.getItem('fairyTailComments') || '[]');
        
        if (comments.length === 0) {
            commentsDisplay.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
            return;
        }
        
        commentsDisplay.innerHTML = comments.map(comment => `
            <div class="comment-item">
                <h4>${comment.name}</h4>
                <p>${comment.comment}</p>
                <small>${comment.timestamp}</small>
            </div>
        `).join('');
    }

   
    if (document.getElementById('comments-display')) {
        displayComments();
    }
    });


document.addEventListener('DOMContentLoaded', function() {
    console.log('Checking form elements...');
    
    const nameInput = document.getElementById('name-input');
    const commentInput = document.getElementById('comment-input');
    const commentForm = document.getElementById('comment-form');
    
    console.log('Name input found:', nameInput);
    console.log('Comment input found:', commentInput);
    console.log('Comment form found:', commentForm);
    
    if (nameInput) {
        nameInput.addEventListener('focus', function() {
            console.log('Name input focused');
        });
    }
    
    if (commentInput) {
        commentInput.addEventListener('focus', function() {
            console.log('Comment input focused');
        });
    }
});