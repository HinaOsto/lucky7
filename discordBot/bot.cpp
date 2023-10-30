#include <dpp/dpp.h>
#include "easyClient.h"
#include <Windows.h>
#include <chrono>

const std::string token{ "" };

/*
	Get Websocket msg
	log websocket msg using discord bot
	create slash command for user to reply to websocket
	send websocket message using discord bot
*/

std::string msg = {};
using easywsclient::WebSocket;


void createBotMessage(std::string& websocketMessage) {
	dpp::cluster bot(token);
	dpp::snowflake websocketDiscordChannel = 1164234707203002398;
	dpp::message onWebsocket = dpp::message(websocketDiscordChannel, websocketMessage, dpp::mt_default);

	std::size_t pos;
	std::string serverMessage = " bigfuckingballsinmymouth";
	if (websocketMessage.find(serverMessage) != std::string::npos) {
		std::cout << "sever";
	}
	else {
		bot.message_create(onWebsocket);
	}

}

std::string handleMessage(const std::string& message) {
	WebSocket::pointer ws = WebSocket::from_url("ws://localhost:8080");
	assert(ws);
	while (ws->getReadyState() != WebSocket::CLOSED) {
		msg = {};
		ws->poll();
		msg = message;
		if (!msg.empty()) {
			std::cout << msg;
			break;
		}
	}

	std::string toFind = " ouiadw321";
	std::string::size_type n = msg.find(toFind);
	if (n != std::string::npos) {
		msg.erase(n, toFind.length());
	}

	createBotMessage(msg);
	delete ws;
	return msg;
}

void sendMessage(std::string sendMsg) {
	WebSocket::pointer ws = WebSocket::from_url("ws://localhost:8080");
	assert(ws);
	while (ws->getReadyState() != WebSocket::CLOSED) {
		ws->send(sendMsg);
		ws->poll();
		break;
	}
	delete ws;
}

void checkForMessages() {
	WebSocket::pointer ws = WebSocket::from_url("ws://localhost:8080");
	assert(ws);
	while (ws->getReadyState() != WebSocket::CLOSED) {
		ws->poll();
		ws->dispatch(handleMessage);
	}
	std::this_thread::sleep_for(std::chrono::milliseconds(2000));
}

void setupBot() {
	dpp::cluster bot(token);

	bot.on_log(dpp::utility::cout_logger());

	bot.on_interaction_create([&bot](const dpp::interaction_create_t& event) {
		if (event.command.type == dpp::it_application_command) {
			dpp::command_interaction cmd_data = std::get<dpp::command_interaction>(event.command.data);
			if (cmd_data.name == "sendmessage") {
				std::string message = std::get<std::string>(event.get_parameter("message"));
				message += " bigfuckingballsinmymouth";
				sendMessage(message.c_str());
				event.reply("Message Sent");
			}
		}
		});

	bot.on_ready([&bot](const dpp::ready_t& event) {
		dpp::slashcommand sendMessageSocket("sendMessage", "Send the websocket a message", bot.me.id);
		sendMessageSocket.add_option(
			dpp::command_option(dpp::co_string, "message", "message to send websocket", false)
		);

		bot.global_command_create(sendMessageSocket);

		});

	bot.start(dpp::st_wait);
}

int main() {
	std::thread botThread(setupBot);
	std::thread webSocketThread(checkForMessages);
	for (;;) {
		botThread.join();
		webSocketThread.join();
	}
	
}