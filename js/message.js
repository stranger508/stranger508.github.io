	const form = document.getElementById('messageForm');
	const messageList = document.getElementById('messageList');
	const clearBtn = document.getElementById('clearMessages');
	
	//加载留言
	windows.addEventListener('DOMContentLoaded',() =>{const savedMessages=JSON.parse(localStorage.getItem('messages')) || [];
		savedMessages.forEach(renderMessage);});
	
	//发布留言
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		
		const username = document.getElementById('username').value;
		const content = document.getElementById('content').value;
		const timestamp = new Date().toLocaleString();
		
		if(!usename || !content) return;
		
		const newMessage = {username,content,timestamp};
			saveMessage(newMessage);
			renderMessage(newMessage);
			from.reset(); });
	
	//渲染留言
	function renderMessage({username, content, timestamp}) {const message = document.createElement('div');
		message.className = 'message';
		
		const avatar = document.createElement('div');
		avatar.className = 'avatar';
		avatar.textContent = username[0];
		
		const nameEl = document.createElement('h3');
		nameEl.textContent = username;
		
		const contentEl = document.createElement('p');
		contentEl.textContent = content;
		
		const timeEl = document.createElement('small');
		timeEl.textContent = timestamp;
		
		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = '删除';
		deleteBtn.style.marginTop = '0.5rem';
		deleteBtn.style.background = '#e74c3c';
		deleteBtn.style.marginLeft = '10px';
		deleteBtn.style.borderRadius = '4px';
		deleteBtn.style.padding = '5px 10px';
		deleteBtn.style.fontSize = '0.8rem';
		
		deleteBtn.onclick = () => {
			message.remove();
			deleteMessage({ username, content, timestamp });
		};
		
		const contentBox = document.createElement('div');
		contentBox.appendChild(nameEl);
		contentBox.appendChild(contentEl);
		contentBox.appendChild(timeEl);
		contentBox.appendChild(deleteBtn);
		
		message.appendChild(avatar);
		message.appendChild(contentBox);
		
		messageList.insertBefore(message, messageList.firstChild);
	}

// 保存留言到 localStorage
function saveMessage(msg) {
	const messages = JSON.parse(localStorage.getItem('messages')) || [];
	messages.unshift(msg);
	localStorage.setItem('messages', JSON.stringify(messages));
}

// 删除某一条留言
function deleteMessage(targetMsg) {
	let messages = JSON.parse(localStorage.getItem('messages')) || [];
	messages = messages.filter(
		msg => !(msg.username === targetMsg.username && msg.content === targetMsg.content && msg.timestamp === targetMsg.timestamp)
	);
	localStorage.setItem('messages', JSON.stringify(messages));
}

// 清空所有留言
clearBtn.addEventListener('click', () => {
	if (confirm('确定要清空所有留言吗？')) {
		localStorage.removeItem('messages');
		messageList.innerHTML = '';
	}
});
		
		
